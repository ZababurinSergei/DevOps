#include <font.h>

typedef struct {
	float x, y, z;    // position
	float s, t;       // texture
	float r, g, b, a; // color
} vertex_t;

FONT::FONT(void* memory_base, size_t memory_size, float _size, WORLD_STATE* _state, int _w, int _h, int _z, bool _dynamic)
{
	state = _state;

	dynamic = _dynamic;

	mat4_set_identity(&projection);
	mat4_set_identity(&model);
	mat4_set_identity(&view);

	if (dynamic == true)
		mat4_set_orthographic(&projection, 0, 512, 0, 512, -1, 1);
	else
		mat4_set_orthographic(&projection, 0, (float)state->x, 0, (float)state->y, -1, 1);

	atlas = texture_atlas_new(_w, _h, _z);
	buffer = vertex_buffer_new("vertex:3f,tex_coord:2f,color:4f");
	font = texture_font_new_from_memory(atlas, _size, memory_base, memory_size);
};

FONT::~FONT()
{
	vertex_buffer_delete(buffer);
	texture_atlas_delete(atlas);
	texture_font_delete(font);
	delete state;
	delete buffer;
	delete atlas;
	delete font;
};

void FONT::draw(GLSL_FONT* glsl_font, FONT_MESSAGE* message)
{
	mat4_set_scaling(&model, message->sx, message->sy, 1);

	if (dynamic == false){
		mat4_set_orthographic(&projection, 0, (float)state->x, 0, (float)state->y, -1, 1);
		//mat4_set_translation( &model, (float)message->xy[0], (float)message->xy[1], 0);
	}

	glUseProgram(glsl_font->Program);
	glBindTexture(GL_TEXTURE_2D, atlas->id);
	glUniform1fv(glGetUniformLocation(glsl_font->Program, "ismooth"), 1, &message->smooth);
	glUniform1iv(glGetUniformLocation(glsl_font->Program, "idynamic"), 1, &message->dynamic);
	glUniform1i(glGetUniformLocation(glsl_font->Program, "texture"), 0);
	glUniform1f(glGetUniformLocation(glsl_font->Program, "iz"), message->z[0]);
	glUniformMatrix4fv(glGetUniformLocation(glsl_font->Program, "model"), 1, 0, model.data);
	glUniformMatrix4fv(glGetUniformLocation(glsl_font->Program, "view"), 1, 0, view.data);
	glUniformMatrix4fv(glGetUniformLocation(glsl_font->Program, "projection"), 1, 0, projection.data);
	vertex_buffer_render(buffer, GL_TRIANGLES);
	glBindTexture(GL_TEXTURE_2D, 0);
	glUseProgram(0);
};

void FONT::clear_buffer()
{
	vertex_buffer_clear(buffer);
};

void FONT::add_to_buffer(FONT_MESSAGE* message)
{
	add_text(message);
};

void FONT::set_font_message(FONT_MESSAGE* message, wchar_t* text, int dynamic, int x, int y, float z, float r, float g, float b, float a,
	float smooth, float sx, float sy, int width, wchar_t* miss, int miss_size)
{
	message->text = text;
	message->dynamic = dynamic;
	message->xy[0] = x;
	message->xy[1] = y;
	message->z[0] = z;
	message->color[0] = r;
	message->color[1] = g;
	message->color[2] = b;
	message->color[3] = a;
	message->smooth = smooth;
	message->sx = sx;
	message->sy = sy;
	message->width = width;
	message->miss = miss;
	message->miss_size = miss_size;
};

void FONT::set_font_message(FONT_MESSAGE* message, wchar_t* text, int dynamic, int x, int y, float z, float r, float g, float b, float a,
	float smooth, float sx, float sy)
{
	message->text = text;
	message->dynamic = dynamic;
	message->xy[0] = x;
	message->xy[1] = y;
	message->z[0] = z;
	message->color[0] = r;
	message->color[1] = g;
	message->color[2] = b;
	message->color[3] = a;
	message->smooth = smooth;
	message->sx = sx;
	message->sy = sy;
	message->width = 0;
	message->miss = 0;
	message->miss_size = 0;
};

void FONT::add_text(FONT_MESSAGE* message){
	size_t i;
	vec2 coord = vec2{ { (float)message->xy[0], (float)message->xy[1] } };
	float r = message->color[0], g = message->color[1], b = message->color[2], a = message->color[3];
	for (i = 0; i<wcslen(message->text); ++i)
	{
		texture_glyph_t *glyph = texture_font_get_glyph(font, message->text[i]);
		if (glyph != NULL)
		{
			float kerning = 0.0f;
			if (i > 0)
			{
				kerning = texture_glyph_get_kerning(glyph, message->text[i - 1]);
			}
			coord.x += kerning;
			float x0 = (float)(int)(coord.x + glyph->offset_x);
			float y0 = (float)(int)(coord.y + glyph->offset_y);
			float x1 = (float)(int)(x0 + glyph->width);
			float y1 = (float)(int)(y0 - glyph->height);
			float s0 = glyph->s0;
			float t0 = glyph->t0;
			float s1 = glyph->s1;
			float t1 = glyph->t1;
			GLuint indices[6] = { 0, 1, 2, 0, 2, 3 };
			vertex_t vertices[4] = { { x0, y0, 0, s0, t0, r, g, b, a },
			{ x0, y1, 0, s0, t1, r, g, b, a },
			{ x1, y1, 0, s1, t1, r, g, b, a },
			{ x1, y0, 0, s1, t0, r, g, b, a } };
			vertex_buffer_push_back(buffer, vertices, 4, indices, 6);

			if (message->miss_size > 0){
				for (int i = 0; i < message->miss_size; i++){
					if (glyph->charcode == message->miss[i])
						coord.x += glyph->advance_x;
					else
						coord.x += message->width;
				}
			}
			else
				coord.x += glyph->advance_x;
		}
	}
}

double FONT::get_width(wchar_t* message){
	size_t i;
	vec2 coord = vec2{ { 0, 0 } };
	for (i = 0; i<wcslen(message); ++i)
	{
		texture_glyph_t *glyph = texture_font_get_glyph(font, message[i]);
		if (glyph != NULL)
		{
			float kerning = 0.0f;
			if (i > 0)
			{
				kerning = texture_glyph_get_kerning(glyph, message[i - 1]);
			}
			coord.x += kerning;

			coord.x += glyph->advance_x;
		}
	}

	return (double)coord.x;
};

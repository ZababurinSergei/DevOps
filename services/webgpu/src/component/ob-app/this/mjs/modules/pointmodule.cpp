#include "pointmodule.h"

PointModule::PointModule()
{
	vertex_source = R"END(
	#version 330 core

    layout(location = 0) in vec2 vertexPosition;

    uniform vec4 ic;
    out vec4 color_in;

    void main(){
        color_in = ic;
        gl_Position = vec4(vertexPosition,0.0, 1.0);
    };

	)END";

	fragment_source = R"END(
	#version 330

	in vec4 color_in;

	void main(){
		gl_FragColor = color_in;
	}

	)END";
}

PointModule::~PointModule()
{

}

int PointModule::Initialize(void* params)
{
	m_pApplication = (Application*)params;

	buffer = 0;
	size = 0;

	int nRes = CreateProgram();
	if (nRes)
		glGenBuffers(1, vbohandles);

	return nRes;
}

void PointModule::Terminate()
{
	TerminateProgram();

	glDeleteBuffers(1, vbohandles);
}

void PointModule::SetBuffer(GLfloat* b, GLsizeiptr s, GLfloat* c)
{
	buffer = b;
	size = s;
	color = c;

}

GLfloat* PointModule::GetBuffer()
{
	return buffer;
}


void PointModule::Draw()
{
	if (buffer)
	{
		glLineWidth(1.0);
		glPointSize(10.0);

		glEnable(GL_POINT_SMOOTH);
		glEnable(GL_LINE_SMOOTH);

		glUseProgram(program);

		//	std::cout << buffer[2] << std::endl;

		glBindBuffer(GL_ARRAY_BUFFER, vbohandles[0]);
		glBufferData(GL_ARRAY_BUFFER, size * sizeof(GLfloat), buffer, GL_STATIC_DRAW);

		glEnableVertexAttribArray(0);
		glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, 0, 0);


		GLint 	location = glGetUniformLocation(program, "ic");

		if (location >= 0)
			glUniform4fv(location, 1, color);
		else
			MessageBox(NULL, "Location Error", "Error", NULL);

		glDrawArrays(GL_POINTS, 0, size);

		glDisableVertexAttribArray(0);
		//glBindBuffer(GL_ARRAY_BUFFER, 0);

		glUseProgram(0);

		glDisable(GL_POINT_SMOOTH);
		glDisable(GL_LINE_SMOOTH);
	}
}

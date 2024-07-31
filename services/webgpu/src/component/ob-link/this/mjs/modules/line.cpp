#include "line.h"

Line::Line(int nSamplesPerSec)
{
	win_line = ((nSamplesPerSec/*������� �������������*/ * 9) / 50) / 20;

	for (int i = 0; i < 8; i++)
	{
		wave_in[i] = 0;
	}

	line_t.tr_00 = 0;
	line_t.tr_01 = 0;
	line_t.tr_p_f = -1;
	line_t.k_first = -5;
	line_t.tr_true = 0;
	line_t.lim_k_tr = 0;
	line_t.tr_p = 0;

	for (int i = 0; i < 4; i++){
		line_ph.phase[i] = 0;
		line_c_in.sys[i] = 0;
	}

	line_te.temp_phase = 0;
	line_l.lim_k_d = 0;

	line_c.k_co = 0;
	line_c.z_c_00 = 0;
	line_c.z_c_01 = 1;
	line_c.z_c_i = 0;
	line_c.z_c_k = 0;

	line_c.i_d_del = 0;
	line_c.i_c_temp = 0;
	for (int i = 0; i < 5; i++){
		line_c.zero[i] = 0;
	}
	line_c.phase_c = 0;

	for (int i = 0; i < 2; i++){
		line_c.i_c[i] = -1;
		line_c.ph_c[i] = -5;

		if (i == 0)
			line_p.min_max[i] = 10000;
		else
			line_p.min_max[i] = -10000;
	}

	line_c.i_d = 0;
	line_c.j_d = 0;
	line_c.k_d = 0;

	line_p.pos_00 = 0;
	line_p.neg_00 = 0;
	line_p.win = win_line;

	line_m.data_i = new double[12 * line_p.win + 0];
	line_m.data_k = new double[12 * line_p.win + 0];
	line_m.line_00 = new double[12 * line_p.win + 0];
	line_m.line_01 = new double[12 * line_p.win + 0];
	line_m.tr_p_i = new double[12 * line_p.win + 0];
	line_m.tr_p_k = new double[12 * line_p.win + 0];
	line_m.line_k = new double[12 * line_p.win + 0];
	line_m.i_det = new double[12 * line_p.win + 0];

	for (int i = 0; i < 4; i++){
		line_c_in.i_l[4 * 1 + i] = -1 - i;
		line_c_in.i_l[i] = 0;
		line_c_in.c_l[i] = -1;
	}

	line_f.out_d = 0;
	line_f.in_01 = 0;
	line_f.k_start = 0;
	line_f.all_z_s_00 = 0;
	line_f.k_fuul = 0;
	line_f.zero_temp = 0;
	line_f.z_s_00 = 0;
	line_f.out_true_peack = 0;

	line_out.cos_phase = 0;
	line_out.sin_phase = 0;
	line_out.dry = 0;
	line_out.wet = 0;

	for (int i = 0; i < 12; i++){
		line_out.write[i] = 0;
		line_out.out[i] = 0;
	}

	std::cout << "int Line::Initialize(void* params)" << std::endl;
}

Line::~Line()
{

	delete[] line_m.data_i;
	delete[] line_m.data_k;
	delete[] line_m.line_00;
	delete[] line_m.line_01;
	delete[] line_m.tr_p_i;
	delete[] line_m.tr_p_k;
	delete[] line_m.line_k;
	delete[] line_m.i_det;

	line_f.out_d = 0;
	line_f.in_01 = 0;
	line_f.k_start = 0;
	line_f.all_z_s_00 = 0;
	line_f.k_fuul = 0;
	line_f.zero_temp = 0;
	line_f.z_s_00 = 0;
	line_f.out_true_peack = 0;

	line_out.sin_phase = 0;
	line_out.cos_phase = 0;
	line_out.dry = 0;
	line_out.wet = 0;

	for (int i = 0; i < 12; i++){
		line_out.write[i] = 0;
		line_out.out[i] = 0;
	}

	line_l.lim_k_d = 0;

	line_c.k_co = 0;
	line_c.z_c_00 = 0;
	line_c.z_c_01 = 0;
	line_c.z_c_i = 0;
	line_c.z_c_k = 0;
	line_c.i_d_del = 0;
	line_c.i_c_temp = 0;

	for (int i = 0; i < 5; i++){
		line_c.zero[i] = 0;
	}
	line_c.phase_c = 0;

	for (int i = 0; i < 2; i++){
		line_c.i_c[i] = 0;
		line_c.ph_c[i] = 0;

		if (i == 0)
			line_p.min_max[i] = 0;
		else
			line_p.min_max[i] = 0;
	}
	line_c.i_d = 0;
	line_c.j_d = 0;
	line_c.k_d = 0;

	line_p.pos_00 = 0;
	line_p.neg_00 = 0;
	line_p.win = 0;

	line_t.tr_00 = 0;
	line_t.tr_01 = 0;
	line_t.tr_p_f = 0;
	line_t.k_first = 0;
	line_t.tr_true = 0;
	line_t.lim_k_tr = 0;
	line_t.tr_p = 0;

	for (int i = 0; i < 4; i++){

		line_ph.phase[i] = 0;
		line_c_in.sys[i] = 0;
	}

	line_te.temp_phase = 0;

	std::cout << "void Line::Terminate()" << std::endl;
}

int Line::Initialize(void* params)
{
	return 1;
}

void Line::Terminate()
{

}

int Line::GetDelay()
{
	return win_line;
}



void Line::core_line(double in) {

	line_c_in = count(line_c_in);

	line_c_in.sys[line_c_in.i_l[0]] = in;

	wave_in[0] = line_c_in.sys[line_c_in.i_l[0]];
	wave_in[1] = line_c_in.sys[line_c_in.i_l[1]];
	wave_in[2] = line_c_in.sys[line_c_in.i_l[2]];
	wave_in[3] = line_c_in.sys[line_c_in.i_l[3]];

	for (int i = 0; i < 5; i++){
		if (line_c_in.c_l[i] == -1){
			wave_in[i] = -5;
		}
	}

	if (line_c_in.c_l[2] == -1)
		line_c.i_d = 0;
	else
		line_c.i_d++;

	if (line_c.i_d >= line_p.win)
		line_c.i_d = 0;

	if (line_c.i_d == 0)
		line_c.i_c[1]++;

	if (line_c.i_d == line_p.win / 2)
		line_c.i_c[0]++;

	if (line_c.i_c[0] == -1){
		line_c.ph_c[0] = 0;
		line_c.ph_c[1] = 0;
	}
	else{
		line_c.ph_c[0] = line_c.i_c[1] - line_c.i_c[0];
		line_c.ph_c[1] = line_c.i_c[1] - (line_c.i_c[0] + 1);
	}

	line_c.i_c_temp = line_c.i_c[1] - 1;

	if (line_c.i_c_temp == -1)
		line_c.i_c_temp = 0;

	if (line_c.ph_c[1] == 0){
		line_c.ph_c[1] = 2;
	}
	if (line_c.i_c[0] == -1){
		line_c.ph_c[1] = -5;
	}
	if (line_c.ph_c[0] == 0){
		line_c.j_d = 0;
	}
	else if (line_c.ph_c[0] == 1){
		line_c.j_d = line_c.i_d - (line_p.win / 2);
	}
	else{
		line_c.j_d = line_c.i_d + (line_p.win / 2);
	}

	line_c.i_d_del = delay_one(line_c.i_d);

	if (wave_in[0 * 4 + 1] == 0)
		line_c.zero[0] = 9;
	else
		line_c.zero[0] = 0;

	if (wave_in[0 * 4 + 1] >= 0)
		line_c.zero[0 * 2 + 1] = 1;
	else
		line_c.zero[1] = 4;

	if (wave_in[0 * 4 + 1] == 0 && wave_in[0 * 4 + 2] < 0)
		line_c.zero[1] = 4;

	if (wave_in[0 * 4 + 0] >= 0)
		line_c.zero[2] = 1;
	else
		line_c.zero[2] = 4;

	if (wave_in[0 * 4 + 0] == 0 && wave_in[0 * 4 + 1] < 0)
		line_c.zero[2] = 4;

	if (wave_in[0 * 4 + 0] > 0 && wave_in[0 * 4 + 1] < 0 || wave_in[0 * 4 + 0] < 0 && wave_in[0 * 4 + 1]>0)
		line_c.zero[3] = 1;
	else
		line_c.zero[3] = 0;

	if (wave_in[0 * 4 + 1] > 0 && wave_in[0 * 4 + 2] < 0 || wave_in[0 * 4 + 1] < 0 && wave_in[0 * 4 + 2]>0)
		line_c.zero[4] = 2;
	else
		line_c.zero[4] = 0;

	if (line_c.zero[0] == 9 && line_c.zero[1] == line_c.zero[2]){
		line_c.zero[3] = 0;
		line_c.zero[4] = 0;
	}
	else if (line_c.zero[0 * 2 + 0] == 9 && line_c.zero[1] > line_c.zero[2] || line_c.zero[0] == 9 && line_c.zero[1] < line_c.zero[2]){

		line_c.zero[3] = 1;
		line_c.zero[4] = 2;
	}

	if (line_c_in.c_l[0 * 4 + 1] == -1){
		line_c.i_d = 0;
		line_c.j_d = 0;
		line_c.k_d = 0;
		line_c.ph_c[0] = -5;
		line_c.ph_c[1] = -5;
		wave_in[0 * 4 + 1] = -5;
		line_c.zero[0] = -5;
		line_c.zero[1] = -5;
		line_c.zero[2] = -5;
		line_c.zero[3] = -5;
		line_c.zero[4] = -5;
	}

	if (line_c.zero[0] == 9 && line_c.zero[1] == 1 && line_c.zero[2] == 4 || line_c.zero[0] == 9 && line_c.zero[1] == 4 && line_c.zero[2] == 1 || line_c.zero[0] != 9 && line_c.zero[4] == 2){
		line_c.z_c_00++;
		line_c.z_c_01++;
	}

	if (line_c.z_c_00 >= line_p.win)
		line_c.z_c_00 = 0;
	if (line_c.z_c_01 >= line_p.win)
		line_c.z_c_01 = 0;


	if (line_t.k_first == -5){

		line_t.k_first = zero_sample_count(line_c.z_c_00, wave_in[1]);
		line_c.k_d = 0;
	}
	else if (line_t.k_first == 1){
		line_c.k_d++;
	};
	if (line_c.k_d >= line_p.win)
		line_c.k_d = 0;


	if (wave_in[0 * 4 + 1] == -5){
		line_p.min_max[0] = 10000;
		line_p.min_max[1] = -10000;
	}
	else if (line_c.zero[0] == 9 && line_c.zero[1] == 1 && line_c.zero[2] == 4 && line_c.zero[3] == 1 && line_c.zero[4] == 2){
		line_p.min_max[0 * 2 + 0] = 10000;
	}
	else if (line_c.zero[0] == 9 && line_c.zero[1] == 4 && line_c.zero[2] == 1 && line_c.zero[3] == 1 && line_c.zero[4] == 2){
		line_p.min_max[0 * 2 + 1] = -10000;
	}
	else if (line_c.zero[1] == 4 && line_c.zero[2] == 1 && line_c.zero[3] == 1 && line_c.zero[4] == 2){
		line_p.min_max[0 * 2 + 0] = 10000;
	}
	else if (line_c.zero[1] == 1 && line_c.zero[2] == 4 && line_c.zero[3] == 1 && line_c.zero[4] == 2){
		line_p.min_max[0 * 2 + 1] = -10000;
	}
	else if (line_c.zero[1] == 4 && line_c.zero[2] == 4 && line_c.zero[3] == 0 && line_c.zero[4] == 2){
		line_p.min_max[0 * 2 + 0] = 10000;
	}
	else if (line_c.zero[1] == 1 && line_c.zero[2] == 1 && line_c.zero[3] == 0 && line_c.zero[4] == 2){
		line_p.min_max[0 * 2 + 1] = -10000;
	}

	if (line_p.min_max[0 * 2 + 0] > wave_in[0 * 4 + 1]){
		line_p.min_max[0 * 2 + 0] = wave_in[0 * 4 + 1];

		if (line_p.min_max[0 * 2 + 0] == -5 && wave_in[0 * 4 + 1] == -5)
			line_p.min_max[0 * 2 + 0] = 10000;
	}
	if (line_p.min_max[0 * 2 + 1] < wave_in[0 * 4 + 1]){
		line_p.min_max[0 * 2 + 1] = wave_in[0 * 4 + 1];
	}
	if (wave_in[0 * 4 + 1] > 0){
		line_p.pos_00 = line_p.min_max[0 * 2 + 1];
		line_p.neg_00 = 0;
	}
	if (wave_in[0 * 4 + 1] < 0){
		line_p.pos_00 = 0;
		line_p.neg_00 = line_p.min_max[0 * 2 + 0];
	}

	line_m.data_i[0 * line_p.win + line_c.i_d] = line_c.zero[0];
	line_m.data_i[1 * line_p.win + line_c.i_d] = line_c.zero[1];
	line_m.data_i[2 * line_p.win + line_c.i_d] = line_c.zero[2];
	line_m.data_i[3 * line_p.win + line_c.i_d] = line_c.zero[3];
	line_m.data_i[4 * line_p.win + line_c.i_d] = line_c.zero[4];
	line_m.data_i[5 * line_p.win + line_c.i_d] = wave_in[0];
	line_m.data_i[6 * line_p.win + line_c.i_d] = wave_in[1];
	line_m.data_i[7 * line_p.win + line_c.i_d] = wave_in[2];
	line_m.data_i[8 * line_p.win + line_c.i_d] = line_p.neg_00;
	line_m.data_i[9 * line_p.win + line_c.i_d] = line_p.pos_00;
	line_m.data_i[10 * line_p.win + line_c.i_d] = line_c.z_c_00;
	line_m.data_i[11 * line_p.win + line_c.i_d] = line_c.z_c_01;


	if (line_p.neg_00 == 0){
		line_t.tr_00 = 0;
	}
	else{
		line_t.tr_00 = 1;
	}

	if (line_p.pos_00 == 0){
		line_t.tr_01 = 0;
	}
	else{
		line_t.tr_01 = 1;
	}

	if ((line_t.tr_00 + line_t.tr_01) == 1){
		line_t.tr_true = 1;
	}
	else{
		line_t.tr_true = 0;
	}

	line_m.line_00[0 * line_p.win + line_c.i_d] = line_m.data_i[8 * line_p.win + +line_c.i_d] + line_m.data_i[9 * line_p.win + line_c.i_d];//����� ���� ����� line_c.i_d (����� ��� ����� ?)

	// ����� ������ ������ �������� +1 (line_c.k_d + 1) 
	if (line_t.k_first == -5){
		line_m.line_01[0 * line_p.win + line_c.k_d] = 0;// �������� ����� ������� �� ����� -5 ������ �� 0
	}
	else{
		line_m.line_01[0 * line_p.win + line_c.k_d] = line_m.line_00[0 * line_p.win + line_c.k_d];

	}

	for (int i = 0; i < 12; i++){
		if (line_t.k_first == -5){
			line_m.data_k[i * line_p.win + line_c.k_d] = -5;// �������� �����
		}
		else{
			line_m.data_k[i * line_p.win + line_c.k_d] = line_m.data_i[i * line_p.win + line_c.k_d];

		}
	}

	if (line_l.lim_k_d>line_m.data_i[10 * line_p.win + line_c.i_d]){

		line_l.lim_k_d = line_m.data_i[11 * line_p.win + line_c.k_d];
		line_t.lim_k_tr = 1;
	}
	else if (line_l.lim_k_d == line_m.data_i[10 * line_p.win + line_c.i_d]){

		line_l.lim_k_d = line_m.data_k[11 * line_p.win + line_c.k_d - 1];
		line_t.lim_k_tr = 2;
	}
	else{
		line_l.lim_k_d = line_m.data_k[11 * line_p.win + line_c.k_d];
		line_t.lim_k_tr = 0;
	}

	if (line_t.k_first == -5){
		line_c.k_co = 0;
	}
	else if (line_c.k_d == 0){
		line_c.k_co++;
	}

	line_t.tr_p = true_peack(line_c.z_c_00);

	line_m.tr_p_i[line_c.i_d] = line_t.tr_p;
	line_m.tr_p_k[line_c.k_d] = line_m.tr_p_i[line_c.k_d];


	if (line_t.tr_p == 1 && line_m.data_i[0 * line_p.win + line_c.i_d] == 9 && line_m.data_i[1 * line_p.win + line_c.i_d] == 4 && line_m.data_i[2 * line_p.win + line_c.i_d] == 1){
		line_m.i_det[0 * line_p.win + line_c.z_c_00] = line_m.data_i[8 * line_p.win + line_c.i_d - 0];
	}
	else if (line_t.tr_p == 1 && line_m.data_i[0 * line_p.win + line_c.i_d] == 9 && line_m.data_i[1 * line_p.win + line_c.i_d] == 1 && line_m.data_i[2 * line_p.win + line_c.i_d] == 4){
		line_m.i_det[0 * line_p.win + line_c.z_c_00] = line_m.data_i[9 * line_p.win + line_c.i_d - 0];
	}
	else if (line_t.tr_p == 1 && line_m.data_i[0 * line_p.win + line_c.i_d] == 0 && line_m.data_i[1 * line_p.win + line_c.i_d] == 4 && line_m.data_i[2 * line_p.win + line_c.i_d] == 4 && line_m.data_i[4 * line_p.win + line_c.i_d] == 2){
		line_m.i_det[0 * line_p.win + line_c.z_c_00] = line_m.line_00[0 * line_p.win + line_c.i_d_del];
	}
	else if (line_t.tr_p == 1 && line_m.data_i[0 * line_p.win + line_c.i_d] == 0 && line_m.data_i[1 * line_p.win + line_c.i_d] == 1 && line_m.data_i[2 * line_p.win + line_c.i_d] == 1 && line_m.data_i[4 * line_p.win + line_c.i_d] == 2){
		line_m.i_det[0 * line_p.win + line_c.z_c_00] = line_m.line_00[0 * line_p.win + line_c.i_d_del];
	}
	else if (line_t.tr_p == 1 && line_m.data_i[0 * line_p.win + line_c.i_d] == 0 && line_m.data_i[1 * line_p.win + line_c.i_d] == 1 && line_m.data_i[2 * line_p.win + line_c.i_d] == 4 && line_m.data_i[3 * line_p.win + line_c.i_d] == 1 && line_m.data_i[4 * line_p.win + line_c.i_d] == 2){
		line_m.i_det[0 * line_p.win + line_c.z_c_00] = line_m.line_00[0 * line_p.win + line_c.i_d_del];
	}
	else if (line_t.tr_p == 1 && line_m.data_i[0 * line_p.win + line_c.i_d] == 0 && line_m.data_i[1 * line_p.win + line_c.i_d] == 4 && line_m.data_i[2 * line_p.win + line_c.i_d] == 1 && line_m.data_i[3 * line_p.win + line_c.i_d] == 1 && line_m.data_i[4 * line_p.win + line_c.i_d] == 2){
		line_m.i_det[0 * line_p.win + line_c.z_c_00] = line_m.line_00[0 * line_p.win + line_c.i_d_del];
	}

	if (line_m.data_k[11 * line_p.win + line_c.k_d] == -5)
		line_m.line_k[0 * line_p.win + line_c.k_d] = 0;
	else
		line_m.line_k[0 * line_p.win + line_c.k_d] = line_m.i_det[0 * line_p.win + line_l.lim_k_d];

	if (line_m.tr_p_i[line_c.i_d] == 1 && line_c.z_c_00 == 0){
		line_c.z_c_i++;
	}
	if (line_m.tr_p_k[line_c.k_d] == 1 && line_m.data_k[11 * line_p.win + line_c.k_d] == 1){
		line_c.z_c_k++;
	}

	if (line_t.k_first == -5){
		line_m.data_k[11 * line_p.win + line_c.k_d] = 0;
		line_m.data_k[6 * line_p.win + line_c.k_d] = 0;
		line_m.data_k[0 * line_p.win + line_c.k_d] = 0;
		line_m.data_k[4 * line_p.win + line_c.k_d] = 0;
	}

	if (line_t.tr_p_f == -1){

		line_t.tr_p_f = first_tr_p_k(line_t.k_first);
	}


	if (line_t.tr_true == 0){
			//std::cout << "��������� ���������" << std::endl;
		//	getchar();
	}

	/////����� ������� ����� ���� ���� ����� ����� ����������
	/**/
	line_te.temp_phase = line_m.line_01[0 * line_p.win + line_c.k_d];

	if (line_m.data_k[0 * line_p.win + line_c.k_d] == 9){
		line_m.line_01[0 * line_p.win + line_c.k_d] = line_m.line_01[0 * line_p.win + line_c.k_d] * -1; //��� �������� ������� � ������� ����� ��������� � ��������� ������� ������ �� �������� ���������
		line_te.temp_phase = line_te.temp_phase *-2; // �� �� ����� ������ ������ ����� �� �����
	}


	if (line_m.line_k[0 * line_p.win + line_c.k_d] > 0 && line_m.line_01[0 * line_p.win + line_c.k_d] < 0){
		line_m.line_01[0 * line_p.win + line_c.k_d] = line_m.line_01[0 * line_p.win + line_c.k_d] * -1;
		line_te.temp_phase = line_te.temp_phase *-1; // ��������� �� �� �����
	}
	if (line_m.line_k[0 * line_p.win + line_c.k_d] < 0 && line_m.line_01[0 * line_p.win + line_c.k_d] > 0){
		line_m.line_01[0 * line_p.win + line_c.k_d] = line_m.line_01[0 * line_p.win + line_c.k_d] * -1;
		line_te.temp_phase = line_te.temp_phase *-1;
	}

	if (line_m.line_k[0 * line_p.win + line_c.k_d] == line_te.temp_phase){
		line_c.phase_c = 2;
	}
	else{
		line_c.phase_c = 1;
	}

	line_out.out[0] = line_m.data_k[0 * line_p.win + line_c.k_d];
	line_out.out[1] = line_m.data_k[1 * line_p.win + line_c.k_d];
	line_out.out[2] = line_m.data_k[2 * line_p.win + line_c.k_d];
	line_out.out[3] = line_m.data_k[3 * line_p.win + line_c.k_d];
	line_out.out[4] = line_m.data_k[4 * line_p.win + line_c.k_d];
	line_out.out[5] = line_m.line_k[0 * line_p.win + line_c.k_d];
	line_out.out[6] = line_m.line_01[0 * line_p.win + line_c.k_d];
	line_out.out[7] = line_m.data_k[6 * line_p.win + line_c.k_d];
	line_out.out[8] = line_te.temp_phase;
	line_out.out[9] = 0;
	line_out.out[10] = 0;
	line_out.out[11] = 0;
	line_out.out[12] = 0;


	line_out.write[0] = line_m.data_k[6 * line_p.win + line_c.k_d];
	line_out.write[1] = line_m.line_k[0 * line_p.win + line_c.k_d];
	line_out.write[2] = line_m.line_01[0 * line_p.win + line_c.k_d];
	line_out.write[3] = line_m.line_k[0 * line_p.win + line_c.k_d];
	line_out.write[4] = line_m.data_i[5 * line_p.win + line_c.k_d];
	line_out.write[5] = line_m.data_k[4 * line_p.win + line_c.k_d];//
	line_out.write[6] = line_m.data_k[0 * line_p.win + line_c.k_d];
	line_out.write[7] = 0;

	if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 1 && line_m.data_k[2 * line_p.win + line_c.k_d] == 1 && line_m.data_k[3 * line_p.win + line_c.k_d] == 0 && line_m.data_i[4 * line_p.win + line_c.k_d] == 0 && line_c.phase_c == 2){
		line_ph.phase[0] = 0;
		line_ph.phase[1] = 2;
		line_ph.phase[2] = 0;
		line_ph.phase[3] = 3;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 1 && line_m.data_k[2 * line_p.win + line_c.k_d] == 1 && line_m.data_k[3 * line_p.win + line_c.k_d] == 0 && line_m.data_i[4 * line_p.win + line_c.k_d] == 2 && line_c.phase_c == 2){
		line_ph.phase[0] = 1;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 2;
		line_ph.phase[3] = 0;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 1 && line_m.data_k[2 * line_p.win + line_c.k_d] == 4 && line_m.data_k[3 * line_p.win + line_c.k_d] == 1 && line_m.data_i[4 * line_p.win + line_c.k_d] == 0 && line_c.phase_c == 2){
		line_ph.phase[0] = 0;
		line_ph.phase[1] = 2;
		line_ph.phase[2] = 0;
		line_ph.phase[3] = 3;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 9 && line_m.data_k[1 * line_p.win + line_c.k_d] == 1 && line_m.data_k[2 * line_p.win + line_c.k_d] == 4 && line_m.data_k[3 * line_p.win + line_c.k_d] == 1 && line_m.data_i[4 * line_p.win + line_c.k_d] == 2 && line_c.phase_c == 1){
		line_ph.phase[0] = 3;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 4;
		line_ph.phase[3] = 0;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 4 && line_m.data_k[2 * line_p.win + line_c.k_d] == 4 && line_m.data_k[3 * line_p.win + line_c.k_d] == 0 && line_m.data_i[4 * line_p.win + line_c.k_d] == 0 && line_c.phase_c == 1){
		line_ph.phase[0] = 3;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 4;
		line_ph.phase[3] = 0;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 4 && line_m.data_k[2 * line_p.win + line_c.k_d] == 4 && line_m.data_k[3 * line_p.win + line_c.k_d] == 0 && line_m.data_i[4 * line_p.win + line_c.k_d] == 2 && line_c.phase_c == 1){
		line_ph.phase[0] = 3;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 4;
		line_ph.phase[3] = 0;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 4 && line_m.data_k[2 * line_p.win + line_c.k_d] == 4 && line_m.data_k[3 * line_p.win + line_c.k_d] == 0 && line_m.data_i[4 * line_p.win + line_c.k_d] == 2 && line_c.phase_c == 2){
		line_ph.phase[0] = 3;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 4;
		line_ph.phase[3] = 0;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 4 && line_m.data_k[2 * line_p.win + line_c.k_d] == 4 && line_m.data_k[3 * line_p.win + line_c.k_d] == 0 && line_m.data_i[4 * line_p.win + line_c.k_d] == 0 && line_c.phase_c == 2){
		line_ph.phase[0] = 0;
		line_ph.phase[1] = 4;
		line_ph.phase[2] = 0;
		line_ph.phase[3] = 1;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 4 && line_m.data_k[2 * line_p.win + line_c.k_d] == 1 && line_m.data_k[3 * line_p.win + line_c.k_d] == 1 && line_m.data_i[4 * line_p.win + line_c.k_d] == 0 && line_c.phase_c == 2){
		line_ph.phase[0] = 0;
		line_ph.phase[1] = 4;
		line_ph.phase[2] = 0;
		line_ph.phase[3] = 1;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 4 && line_m.data_k[2 * line_p.win + line_c.k_d] == 1 && line_m.data_k[3 * line_p.win + line_c.k_d] == 1 && line_m.data_i[4 * line_p.win + line_c.k_d] == 2 && line_c.phase_c == 2){
		line_ph.phase[0] = 3;
		line_ph.phase[1] = 4;
		line_ph.phase[2] = 4;
		line_ph.phase[3] = 1;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 9 && line_m.data_k[1 * line_p.win + line_c.k_d] == 4 && line_m.data_k[2 * line_p.win + line_c.k_d] == 1 && line_m.data_k[3 * line_p.win + line_c.k_d] == 1 && line_m.data_i[4 * line_p.win + line_c.k_d] == 2 && line_c.phase_c == 1){
		line_ph.phase[0] = 1;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 2;
		line_ph.phase[3] = 0;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 1 && line_m.data_k[2 * line_p.win + line_c.k_d] == 1 && line_m.data_k[3 * line_p.win + line_c.k_d] == 0 && line_m.data_i[4 * line_p.win + line_c.k_d] == 0 && line_c.phase_c == 1){
		line_ph.phase[0] = 1;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 2;
		line_ph.phase[3] = 0;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 1 && line_m.data_k[2 * line_p.win + line_c.k_d] == 1 && line_m.data_k[3 * line_p.win + line_c.k_d] == 0 && line_m.data_i[4 * line_p.win + line_c.k_d] == 2 && line_c.phase_c == 1){
		line_ph.phase[0] = 1;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 2;
		line_ph.phase[3] = 0;
	}
	else if (line_m.data_k[0 * line_p.win + line_c.k_d] == 0 && line_m.data_k[1 * line_p.win + line_c.k_d] == 1 && line_m.data_k[2 * line_p.win + line_c.k_d] == 4 && line_m.data_k[3 * line_p.win + line_c.k_d] == 1 && line_m.data_i[4 * line_p.win + line_c.k_d] == 2 && line_c.phase_c == 2){
		line_ph.phase[0] = 1;
		line_ph.phase[1] = 2;
		line_ph.phase[2] = 2;
		line_ph.phase[3] = 3;
	}
	else{
		line_ph.phase[0] = 0;
		line_ph.phase[1] = 0;
		line_ph.phase[2] = 0;
		line_ph.phase[3] = 0;
	}

	line_out.sin_phase = line_m.line_k[0 * line_p.win + line_c.k_d];
	line_out.dry = line_m.data_k[6 * line_p.win + line_c.k_d];


	if (line_ph.phase[2] == 0 && line_ph.phase[3] == 3){

		line_out.cos_phase = line_m.line_k[0 * line_p.win + line_c.k_d] * -1;
	}
	else if (line_ph.phase[2] == 2 && line_ph.phase[3] == 0){

		line_out.cos_phase = line_m.line_k[0 * line_p.win + line_c.k_d];
	}
	else if (line_ph.phase[2] == 0 && line_ph.phase[3] == 1){

		line_out.cos_phase = line_m.line_k[0 * line_p.win + line_c.k_d] * -1;
	}
	else if (line_ph.phase[2] == 2 && line_ph.phase[3] == 3){

		line_out.cos_phase = line_m.line_k[0 * line_p.win + line_c.k_d] * -1;
	}
	else if (line_ph.phase[2] == 4 && line_ph.phase[3] == 1){

		line_out.cos_phase = line_m.line_k[0 * line_p.win + line_c.k_d] * -1;
	}

	//Set out
//	SetOutChanel(line_out.sin_phase, line_out.cos_phase);
};


double	Line::Bus_in_master()
{
	return 0;
}
double	Line::Bus_in_1()
{
	return 0;
}
double	Line::Bus_in_2()
{
	return 0;
}
double	Line::Bus_in_3()
{
	return 0;
}
double	Line::Bus_in_4()
{
	return 0;
}
double	Line::Bus_in_5()
{
	return 0;
}
double	Line::Bus_in_6()
{
	return 0;
}
double	Line::Bus_in_7()
{
	return 0;
}
double	Line::Bus_in_8()
{
	return 0;
}

//
double	Line::Bus_out_master()
{
	return 0;
}
double	Line::Bus_out_1()
{
	return 0;
}
double	Line::Bus_out_2()
{
	return 0;
}
double	Line::Bus_out_3()
{
	return 0;
}
double	Line::Bus_out_4()
{
	return 0;
}
double	Line::Bus_out_5()
{
	return 0;
}
double	Line::Bus_out_6()
{
	return 0;
}
double	Line::Bus_out_7()
{
	return 0;
}
double	Line::Bus_out_8()
{
	return 0;
}
//

l_count_in  Line::count(l_count_in in){

	for (int i = 0; i < 4; i++){
		in.i_l[4 * 1 + i]++;

		if (in.i_l[4 * 1 + i] > 3){
			in.i_l[4 * 1 + i] = 0;
		}

		if (in.i_l[4 * 1 + i] < 0){
			in.i_l[4 * 0 + i] = 0;
		}
		else{
			in.i_l[4 * 0 + i] = in.i_l[4 * 1 + i];
		}

		if (in.i_l[4 * 1 + i] == 0){

			in.c_l[i] ++;
		}
	}
	return in;
}


int Line::delay_one(int in){
	line_f.out_d = line_f.in_01;
	line_f.in_01 = in;
	return line_f.out_d;
};


int Line::zero_sample_count(int zero, double in){

	if (line_f.k_start == -5){

		line_f.all_z_s_00 = line_f.all_z_s_00;
	}
	else{

		if (zero == 0 && line_c.i_d <= line_p.win * 0.5){
			line_f.k_fuul = -1;
		}
		else if (zero > 0 && line_c.i_d < line_p.win * 0.5){
			line_f.k_fuul = 1;
		}
		else{
			line_f.k_fuul = 0;
		}

		if (line_f.zero_temp != zero){

			line_f.all_z_s_00 = line_f.all_z_s_00 + line_f.z_s_00;
			line_f.z_s_00 = 1;
		}
		else if (line_f.zero_temp == zero){
			line_f.z_s_00++;
		}

		line_f.zero_temp = zero;

		if (in == -5)
			line_f.z_s_00 = 0;

		if (zero > 0 && line_c.i_d >= (line_p.win * 0.4) && line_c.i_d <= (line_p.win * 0.5)){
			line_f.k_start = 10;

			if (line_f.k_start == 10){

				line_f.all_z_s_00 = line_f.all_z_s_00 + line_f.z_s_00;
			}
			line_f.k_start = -5;
			return 1;
		}
		else if (zero == 0 && line_c.i_d == (line_p.win * 0.5)){

			line_f.k_start = 10;
			if (line_f.k_start == 10){

				line_f.all_z_s_00 = (line_p.win * 0.5) + 1;
			}
			line_f.k_start = -5;
			return 1;
		}
	}

	return -5;
	//show_01(i_d, k_d, j_d, zero, all_z_s_00, k_start, -5, -5, -5, -5, in);
}


int Line::true_peack(int phase_num){

	if (line_f.out_true_peack == phase_num){
		return 0;
	}
	else if (line_f.out_true_peack != phase_num){

		line_f.out_true_peack = phase_num;
		return  1;
	}
};



int Line::first_tr_p_k(int in){

	if (in == -5)
	{
		return -1;
	}
	else if (in == 1){

		line_m.tr_p_k[line_c.k_d] = 1;
		line_m.data_k[4 * line_p.win + line_c.k_d] = 2;

		return 1;
	}
	else
	{
		return -1;
	}
}




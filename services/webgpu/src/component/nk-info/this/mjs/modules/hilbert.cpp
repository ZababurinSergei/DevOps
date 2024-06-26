#include "hilbert.h"

Hilbert::Hilbert()
{
}

Hilbert::~Hilbert()
{
}

int Hilbert::Initialize(void* params)
{
	return 1;
}

void Hilbert::Terminate()
{

}

void Hilbert::hilbert_core(double in){

	hilbert_c_in.sys[0] = in;

	hilbert_c_in.wave_in[0] = hilbert_c_in.sys[hilbert_c_in.i_l[0]];
	hilbert_c_in.wave_in[1] = hilbert_c_in.sys[hilbert_c_in.i_l[1]];
	hilbert_c_in.wave_in[2] = hilbert_c_in.sys[hilbert_c_in.i_l[2]];
	hilbert_c_in.wave_in[3] = hilbert_c_in.sys[hilbert_c_in.i_l[3]];

	if (hilbert_c_in.c_l[0] == -1)
		hilbert_c_in.wave_in[0] = 0;

	if (hilbert_c_in.c_l[0 * 4 + 1] == -1)
		hilbert_c_in.wave_in[0] = 0;

	if (hilbert_c_in.c_l[0 * 4 + 2] == -1)
		hilbert_c_in.wave_in[0] = 0;

	if (hilbert_c_in.c_l[0 * 4 + 3] == -1)
		hilbert_c_in.wave_in[0] = 0;

	hilbert_out.sin = pole_ap_sin(in, (double) 0.692388);
	hilbert_out.sin = pole_ap_sin(hilbert_out.sin, (double) 0.936065);
	hilbert_out.sin = pole_ap_sin(hilbert_out.sin, (double) 0.988230);
	hilbert_out.sin = pole_ap_sin(hilbert_out.sin, (double) 0.998749);
	
	hilbert_out.cos = pole_ap_cos(in,	 (double) 0.402192);
	hilbert_out.cos = pole_ap_cos(hilbert_out.cos, (double) 0.856171);
	hilbert_out.cos = pole_ap_cos(hilbert_out.cos, (double) 0.972291);
	hilbert_out.cos = pole_ap_cos(hilbert_out.cos, (double) 0.995288);

}

double Hilbert::pole_ap_sin(double in, double coeff)
{

	hilbert_s.aa_sin = coeff * coeff;
	hilbert_s.out_sin = hilbert_s.aa_sin * (in + hilbert_s.out_02_sin) - hilbert_s.in_02_sin;

	hilbert_s.in_02_sin = hilbert_s.in_01_sin;
	hilbert_s.in_01_sin = in;
	hilbert_s.out_02_sin = hilbert_s.out_01_sin;
	hilbert_s.out_01_sin = hilbert_s.out_sin;

	return hilbert_s.out_sin;
};

double Hilbert::pole_ap_cos(double in, double coeff)
{

	hilbert_c.aa_cos = coeff * coeff;

	hilbert_c.in_02_cos = hilbert_c.in_01_cos;
	hilbert_c.in_01_cos = in;
	hilbert_c.out_02_cos = hilbert_c.out_01_cos;
	hilbert_c.out_01_cos = hilbert_c.out_cos;

	hilbert_c.out_cos = hilbert_c.aa_cos * (in + hilbert_c.out_02_cos) - hilbert_c.in_02_cos;
	return hilbert_c.out_cos;
};

void Hilbert::init(){

	for (int i = 0; i < 4; i++){
		hilbert_c_in.i_l[4 * 1 + i] = -1 - i;
		hilbert_c_in.i_l[i] = 0;
		hilbert_c_in.c_l[i] = -1;
		hilbert_c_in.wave_in[i] = 0;
	}

	hilbert_c_in.sys[1] = 0;

	hilbert_s.aa_sin = 0;
	hilbert_s.in_01_sin = 0;
	hilbert_s.in_02_sin = 0;
	hilbert_s.out_01_sin = 0;
	hilbert_s.out_02_sin = 0;
	hilbert_s.out_sin = 0;

	hilbert_c.aa_cos = 0;
	hilbert_c.in_01_cos = 0;
	hilbert_c.in_02_cos = 0;
	hilbert_c.out_01_cos = 0;
	hilbert_c.out_02_cos = 0;
	hilbert_c.out_cos = 0;

};


h_count_in  Hilbert::count(h_count_in in){

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



double	Hilbert::Bus_in_master()
{
	return 0;
}
double	Hilbert::Bus_in_1()
{
	return 0;
}
double	Hilbert::Bus_in_2()
{
	return 0;
}
double	Hilbert::Bus_in_3()
{
	return 0;
}
double	Hilbert::Bus_in_4()
{
	return 0;
}
double	Hilbert::Bus_in_5()
{
	return 0;
}
double	Hilbert::Bus_in_6()
{
	return 0;
}
double	Hilbert::Bus_in_7()
{
	return 0;
}
double	Hilbert::Bus_in_8()
{
	return 0;
}

//
double	Hilbert::Bus_out_master()
{
	return 0;
}
double	Hilbert::Bus_out_1()
{
	return 0;
}
double	Hilbert::Bus_out_2()
{
	return 0;
}
double	Hilbert::Bus_out_3()
{
	return 0;
}
double	Hilbert::Bus_out_4()
{
	return 0;
}
double	Hilbert::Bus_out_5()
{
	return 0;
}
double	Hilbert::Bus_out_6()
{
	return 0;
}
double	Hilbert::Bus_out_7()
{
	return 0;
}
double	Hilbert::Bus_out_8()
{
	return 0;
}
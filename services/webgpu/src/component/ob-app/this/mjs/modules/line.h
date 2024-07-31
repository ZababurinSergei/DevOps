#ifndef _LINEDERIVED_H_
#define _LINEDERIVED_H_

#include <iostream>
#include "filter_base.h"



struct l_count_in
{
	double	sys[4];
	int		i_l[8];
	int		c_l[8];
};

struct l_temp
{
	double temp_phase; // для разделения четвертей убираю равенство первого семпла
};

struct l_phase
{
	int phase[4]; // для разделения четвертей убираю равенство первого семпла
};

struct l_triger
{
	int k_first;
	int tr_00;
	int tr_01;
	int tr_true;
	int lim_k_tr;
	int tr_p;
	int tr_p_f;
};

struct l_param
{
	int		win;
	double	pos_00;
	double	neg_00;
	double	min_max[2];
};

struct l_memory
{
	double * data_i;
	double * data_k;
	double * tr_p_i;
	double * tr_p_k;
	double * i_det;
	double * line_k;
	double * line_00;
	double * line_01;
};

struct l_count
{
	int i_d;
	int j_d;
	int k_d;

	int i_d_del;
	int i_c_temp;

	int i_c[2];
	int ph_c[2];

	int	zero[5];

	int z_c_00;
	int z_c_01;

	int k_co;
	int z_c_i;
	int z_c_k;

	int phase_c;
};

struct l_limit
{
	int lim_k_d;
};

struct line_out
{

	double   write[12];
	double   out[12];
	double   sin_phase;
	double   cos_phase;
	double   dry;
	double   wet;

};

struct l_in_func
{
	int out_d = 0;
	int in_01 = 0;
	int k_start = 0;
	int all_z_s_00 = 0;
	int k_fuul = 0;
	int zero_temp = 0;
	int z_s_00 = 0;
	int out_true_peack = 0;
};


class Line : public CFilterBase
{
public:
	Line(int nSamplesPerSec);
	virtual ~Line();

	virtual int		Initialize(void* params);
	virtual void	Terminate();

	virtual double	Bus_in_master();
	virtual double	Bus_in_1();
	virtual double	Bus_in_2();
	virtual double	Bus_in_3();
	virtual double	Bus_in_4();
	virtual double	Bus_in_5();
	virtual double	Bus_in_6();
	virtual double	Bus_in_7();
	virtual double	Bus_in_8();

	virtual double	Bus_out_master();
	virtual double	Bus_out_1();
	virtual double	Bus_out_2();
	virtual double	Bus_out_3();
	virtual double	Bus_out_4();
	virtual double	Bus_out_5();
	virtual double	Bus_out_6();
	virtual double	Bus_out_7();
	virtual double	Bus_out_8();

	void core_line(double in);
	int GetDelay();
private:

	l_temp		line_te;
	l_count		line_c;
	l_param		line_p;
	l_in_func	line_f;
	l_triger	line_t;
	l_memory	line_m;
	l_limit		line_l;
	line_out	line_out;
	l_phase		line_ph;
	l_count_in  line_c_in;

	double wave_in[8];

	l_count_in count(l_count_in in);
	
	int  delay_one(int in);
	int  zero_sample_count(int zero, double in);
	int  true_peack(int phase_num);
	int  first_tr_p_k(int in);
	int	win_line;
protected:

};

#endif

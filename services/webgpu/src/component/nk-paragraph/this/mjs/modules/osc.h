
#ifndef OSC_HI_H
#define OSC_HI_H

#include <iostream>
#include <iomanip>
#include "filter_base.h"

#define PI 3.14159265 


struct osc_substrate_static{

	int		quarter[8];
	int		step_phase[8];
	double	step[8];
	int		deg[8];
};

struct osc_substrate_dynamic{

	int dynamic_phase[8];

};

struct osc_callback{

	int		first_param;
	int		change_phase;
	int		third;
};

struct o_param{

	double	up_lim;
	double	norm;
	int		lenght;

};

struct o_line_param{

	int		in;
	int		in_pos;
	int		i_ph;
	int		i_c;
	int		i_s;

};

struct o_sin_param_01{

	int		t;		//time for sine
	double	deg;
	double	rad;
	double	norm_sin_cos;
	double	w_0;	// омега - циклическая частота волны вариант 1
	double	w_1;	// омега - циклическая частота волны вариант 2
	double	T;
	double	freq;
	double	phase;
};

struct o_sin_param_02{

	double  step;
	double	rad;
	double	t;

};

struct o_out{

	double  line;
	double  line_sin;
	double	sin_cos;
	double  sin;
	double  cos;

	double  sin_deg;
	double  cos_deg;

};

class OSC : public CFilterBase
{
public:
	OSC();
	virtual ~OSC();

	void osc_core(int init, int change_phase, int third);
	o_out				osc_out[8];

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


private:
	osc_substrate_static osc_substrate_s;
	osc_substrate_dynamic osc_substrate_d;

	o_param				osc_p[8];
	o_line_param		osc_lp[8];

	osc_callback		osc_cb;

	o_sin_param_01		osc_sp01[8];
	o_sin_param_02		osc_sp02[8];
	
	void osc_relation();
	void osc_property();

	void init();

	void osc_init_00();
	void osc_init_01();


	o_line_param			first_step(o_line_param in, int lenght_in);
	o_line_param		  up(o_line_param in, int lenght_in);
	o_line_param		down(o_line_param in, int lenght_in);
	o_line_param	state(o_line_param in, int lenght_in);
	o_line_param  change_phase(o_line_param in, int lenght_in);


	double square_sin(double dry, int phase, double up_lim);
};

#endif 
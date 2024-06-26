#ifndef HILBERT_HI_H
#define HILBERT_HI_H

#include <iostream> 
#include "filter_base.h"

struct h_count_in{

	double sys[1];
	double wave_in[4];
	int i_l[8];
	int c_l[8];
};

struct h_sin{

	double aa_sin;
	double in_01_sin;
	double in_02_sin;
	double out_01_sin;
	double out_02_sin;
	double out_sin;
};

struct h_cos{

	double aa_cos;
	double in_01_cos;
	double in_02_cos;
	double out_01_cos;
	double out_02_cos;
	double out_cos;
};

struct h_out{

	double  sin;
	double  cos;
};


class Hilbert : public CFilterBase
{
public:

	Hilbert();
	virtual	~Hilbert();

	h_count_in  hilbert_c_in;
	h_sin		hilbert_s;
	h_cos		hilbert_c;
	h_out		hilbert_out;

	h_count_in count(h_count_in in);

	void   hilbert_core(double in);
	double pole_ap_sin(double in, double coeff);
	double pole_ap_cos(double in, double coeff);

	void init();

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

};


#endif 

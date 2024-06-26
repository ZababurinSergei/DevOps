#ifndef DELAY_CORE_H
#define DELAY_CORE_H

#include <iostream>  
#include <iomanip>
#include "filter_base.h"

class WaveFilters;

struct delay_count{

	int		delay;
	int		i;
	int		j;
	int		first;
};

struct delay_out{
	double		dry;
	double		wet;
};


class Delay : public CFilterBase
{
public:
	Delay();
	virtual ~Delay();

	double *dry;
	double *wet;

	delay_count		d_count;
	delay_out		d_out;


	void core_delay(double in);
	void init_memory(int delay);
	delay_count del_count(delay_count in);

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

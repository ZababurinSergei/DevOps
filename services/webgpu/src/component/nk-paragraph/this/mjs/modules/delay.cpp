#include "delay.h"


Delay::Delay()
{
	d_count.first = 1;
	d_count.i = -1;
	d_count.j = -1;
}

Delay::~Delay()
{
}

int Delay::Initialize(void* params)
{
	return 1;
}

void Delay::Terminate()
{

}

void Delay::core_delay(double in/*, int delay*/){

	d_count = del_count(d_count);
	dry[d_count.i] = in;

	if (d_count.first == 1)
		wet[d_count.j] = 0;
	else
		wet[d_count.j] = dry[d_count.j];

	d_out.dry = in;
	d_out.wet = wet[d_count.j];

};

void Delay::init_memory(int delay)
{

	dry = (double*)realloc(dry, delay * 2 * sizeof(double));
	wet = (double*)realloc(wet, delay * 2 * sizeof(double));

	d_count.delay = delay;
};

delay_count Delay::del_count(delay_count in){

	in.i++;

	if (in.i >(in.delay * 2 - 1))
		in.i = 0;

	if (in.first == 1){

		if (in.i < (in.delay)){
			in.first = 1;
			in.j = 0;
		}
		else
			in.first = 0;
	}
	else{
		in.j++;

		if (in.j >(in.delay * 2 - 1))
			in.j = 0;
	}

	return in;
};


double	Delay::Bus_in_master()
{
	return 0;
}
double	Delay::Bus_in_1()
{
	return 0;
}
double	Delay::Bus_in_2()
{
	return 0;
}
double	Delay::Bus_in_3()
{
	return 0;
}
double	Delay::Bus_in_4()
{
	return 0;
}
double	Delay::Bus_in_5()
{
	return 0;
}
double	Delay::Bus_in_6()
{
	return 0;
}
double	Delay::Bus_in_7()
{
	return 0;
}
double	Delay::Bus_in_8()
{
	return 0;
}

//
double	Delay::Bus_out_master()
{
	return 0;
}
double	Delay::Bus_out_1()
{
	return 0;
}
double	Delay::Bus_out_2()
{
	return 0;
}
double	Delay::Bus_out_3()
{
	return 0;
}
double	Delay::Bus_out_4()
{
	return 0;
}
double	Delay::Bus_out_5()
{
	return 0;
}
double	Delay::Bus_out_6()
{
	return 0;
}
double	Delay::Bus_out_7()
{
	return 0;
}
double	Delay::Bus_out_8()
{
	return 0;
}

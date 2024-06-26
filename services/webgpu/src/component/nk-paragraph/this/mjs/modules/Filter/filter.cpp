#include "filter.h"
#include <cmath>

FILTER::FILTER()
{};

void FILTER::initialize(){
	a = b = freq = freq_old = in1 = out = 0;
	type_old = 0;
	pi = atan(1)*4.0;
};

FILTER::~FILTER(){
};

double FILTER::create(double _in, double _freq, short _type){

	if(type_old != _type){
		type_old = _type;
		a = b = freq = freq_old = in1 = out = 0;
	};

	if(freq_old != _freq){
		freq_old = _freq;
		freq = pow(_freq, pi);
		a  = cos(pi*freq)/(1 + sin(pi*freq));
		if(_type == 0)
			b  = 0.5*(1 - a);
		else if(_type == 1)
			b  = 0.5*(1 + a);
	};

	if(_type == 0 && _freq < 1 || _type == 1 && _freq > 0){
		//1-Pole LP
		if(_type == 0)
			out  = a*out + b*(_in + in1);
		//1-Pole HP
		else if(_type == 1)
			out  = a*out + b*(_in - in1);

		in1  = _in;
		return out;
	}else{
		return _in;
	};
};









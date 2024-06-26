#include "midside.h"

MIDSIDE::MIDSIDE() : knob_multy1(0), knob_multy2(0), knob_data1(0), knob_data2(0)
{};

MIDSIDE::~MIDSIDE()
{};

void MIDSIDE::decode(double* _out1, double* _out2, double _in1, double _in2, bool add){
	if(add == 1){
		*_out1 += (_in1 + _in2) * 0.5;
		*_out2 += (_in1 - _in2) * 0.5;
	}else{
		*_out1 = (_in1 + _in2) * 0.5;
		*_out2 = (_in1 - _in2) * 0.5;
	};
};

void MIDSIDE::encode(double* _out1, double* _out2, double _in1, double _in2, bool add){
	if(add == 1){
		*_out1 += (_in1 + _in2);
		*_out2 += (_in1 - _in2);
	}else{
		*_out1 = (_in1 + _in2);
		*_out2 = (_in1 - _in2);
	};
};

void MIDSIDE::knob(double* _out1, double* _out2, double _in1, double _in2, double knob){

	encode(&knob_data1, &knob_data2, _in1, _in2, 0);

	if(knob < 0.5){
		knob_multy1 = knob * 2.0;
		knob_multy2 = 1.0;
	}else{
		knob_multy1 = 1.0;	
		knob_multy2 = 2.0 - (knob * 2.0);	
	};

	decode(_out1, _out2, (knob_data1*knob_multy1), (knob_data2*knob_multy2), 0);	
};
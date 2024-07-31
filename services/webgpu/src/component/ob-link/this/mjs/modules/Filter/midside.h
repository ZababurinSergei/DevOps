#ifndef MIDSIDE_H
#define MIDSIDE_H


class MIDSIDE{

public:
    MIDSIDE();
    ~MIDSIDE();

	double knob_multy1;
	double knob_multy2;
	double knob_data1;
	double knob_data2;

	void decode(double* _out1, double* _out2, double _in1, double _in2, bool add);
	void encode(double* _out1, double* _out2, double _in1, double _in2, bool add);
	void knob  (double* _out1, double* _out2, double _in1, double _in2, double knob);
};

#endif
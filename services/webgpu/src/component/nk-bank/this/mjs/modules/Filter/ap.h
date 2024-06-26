#ifndef AP_H
#define AP_H

class AP{

public:
    AP();
    ~AP();

	short   depth;
	double* in;
	double* out;
	double  out_;

	void initialize(short _depth);
	double create(double _in, double _a);
};

#endif
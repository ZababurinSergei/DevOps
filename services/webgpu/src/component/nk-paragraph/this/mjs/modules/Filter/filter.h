#ifndef FILTER_H
#define FILTER_H


class FILTER{

public:
    FILTER();
    ~FILTER();

	double pi;
	double a;
	double b;
	double freq;
	double freq_old;
	double in1;
	double out;
	short type_old;

	void initialize();
	double create(double _in, double _freq, short _type);
};

#endif


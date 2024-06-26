#include "ap.h"

AP::AP()
{};

void AP::initialize(short _depth){
	depth = _depth;
	in  = new double[depth];
	out = new double[depth];
	for(int i = 0; i < depth; i++)
		in[i] = out[i] = 0;
};

AP::~AP(){
	delete[] in;
	delete[] out;
};

double AP::create(double _in, double _a){
	out_ =  _a * (_in + out[depth-1]) - in[depth-1];

	for(int i = 0; i < depth-1; i++){
		out[i+1] = out[i];
		in[i+1] = in[i];
	};

	out[0] = out_;
	in [0] = _in;

	return out_;
};



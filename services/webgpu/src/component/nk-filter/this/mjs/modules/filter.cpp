#include "filter.h"

Filter::Filter()
{
	
}

Filter::~Filter()
{

}

int Filter::Initialize(void* params)
{
	std::cout << "int Filter::Initialize(void* params)" << std::endl;

	return 1;
}

void Filter::Terminate()
{

}

Line * Filter::CreateLine(int nSamplesPerSec)
{
	
	Line *obj = new Line(nSamplesPerSec);
	return obj;
}

Delay * Filter::CreateDelay()
{

	Delay *obj = new Delay;
	return obj;
}

Hilbert * Filter::CreateHilbert()
{

	Hilbert *obj = new Hilbert;
	return obj;
}

OSC* Filter::CreateOSC()
{

	OSC *obj = new OSC;
	return obj;
}
/*
FFT * Filter::CreateFFT()
{

	FFT *obj = new FFT;
	return obj;
}
*/
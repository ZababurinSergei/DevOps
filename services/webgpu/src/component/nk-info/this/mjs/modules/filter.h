#ifndef _FILTERH_H_
#define _FILTERH_H_

#include <iostream>
#include "fft_2.h"
#include "line.h"
#include "delay.h"
#include "hilbert.h"
#include "osc.h"
#include "glbase.h"

class Filter : public CSystemBase
{
public:
	Filter();
	virtual ~Filter();

	virtual int		Initialize(void* params);
	virtual void	Terminate();

	Line *		CreateLine(int nSamplesPerSec);
	Delay *		CreateDelay();
	Hilbert *	CreateHilbert();
	OSC*		CreateOSC();
//	FFT *		CreateFFT();

protected:

	
};

#endif

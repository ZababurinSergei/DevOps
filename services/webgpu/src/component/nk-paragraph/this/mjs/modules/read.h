#ifndef READ_HI_H
#define READ_HI_H

#include "wavefile.h"
#include "struct.h"
#include "delay_c.h"
#include <iostream>   
#include "line.h"
#include "osc.h"
#include "hilbert.h"
#include "write.h"

#include "glbase.h"
#include "glsoundapp.h"

class READ : public SystemBase
{
public:
	READ();
	virtual ~READ();

	int				Initialize(void* params);
	void			Terminate();

	Application*	m_pApplication;

	int*i_l;
	int*c_l;
	double*dval;
	WAVPARAM *	w_l;

	int stop;

	void core_read();

private:

};

#endif
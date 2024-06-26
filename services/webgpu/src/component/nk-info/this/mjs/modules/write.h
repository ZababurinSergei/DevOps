#ifndef WRITE_HI_H
#define WRITE_HI_H

#include <iostream>   
#include "wavefile.h"
#include "struct.h"
#include "delay_c.h"
#include "line.h"
#include "osc.h"
#include "hilbert.h"

#include "glbase.h"
#include "glsoundapp.h"

class WRITE : public SystemBase
{
public:
//
	WRITE();
	virtual ~WRITE();

	int				Initialize(void* params);
	void			Terminate();

	Application*	m_pApplication;
	

	size_t len;


	int*i_l;
	int*c_l;
	double*dval;
	WAVPARAM *	w_l;

	double* sys_00_00;
	double* sys_00_01;
	double* sys_00_02;
	double* sys_00_03;

	double * out_00_00;
	double * out_00_01;
	double * out_00_02;
	double * out_00_03;

	


	int i_00_00;
	int i_00_01;
	int i_00_02;
	int i_00_03;

	void core_write();
	int write_true(int t_in_00);
	int malloc_buffers(int len);
	int realloc_buffers(int len);

private:

};



#endif
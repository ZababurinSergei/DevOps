#ifndef LOOP_H
#define LOOP_H

#include <iostream>
#include <iomanip>

#include <windows.h>

#include <stdlib.h>
#include <malloc.h>
#include <memory.h>
#include <tchar.h>

#include "glsoundapp.h"
#include "glbase.h"
#include "wavebuffer.h"
#include "wavefilters.h"


struct R_00{

	int a = 0;

};

struct P_00{
	
	int osc; //корневой пресет
	int osc_num; //номер OSC
	int class_osc_num; //Какой OSC

};

struct m_00{



};


struct  osc_init{

	int osc_first_init;
	int osc_second_init;
	int osc_third_init;
};


class Application;

class WaveProcess : public SystemBase
{
public:

	WaveProcess();
	virtual ~WaveProcess();

	int				Initialize(void* params);
	void			Terminate();

	Application*	m_pApplication;


	static void		ProcessWaveFile(WaveFormat &fmt, float** buffers, size_t len, void* ptrParam);

	osc_init		osc_ini;


	int		quarter_temp[8];
	int		step_phase_temp[8];
	int		dynamic_phase_temp[8];
	int		deg_temp[8];

	void osc_call_back(osc_substrate_static, osc_substrate_dynamic);

	void Process(char* name);

};

#endif
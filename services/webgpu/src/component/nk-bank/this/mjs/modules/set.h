
#ifndef SET_A_H
#define SET_A_H


#include <world_data.h>


#include <iostream>

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include "wavefile.h"



#include "math.h"



class SET
{
public:
	SET();
	~SET();

	WaveFile *wf;
	WORLD_STATE * state;

	//_____________________________set_02_чтение графика VST

	double buf_filter_count = 0.0;
	float buf_max = -1000.0f;
	float buf_min = 1000.0f;
	double buf_filter = 0;
	float one_db = 0.89125093813374556f;
	float* buf_mem_maxmin;
	unsigned int buf_position;
	unsigned int buf_count;

	//______________________________________________________


	void set_00();
	void set_01(float **input, int how); //чтение графика VST
	void set_02();
	void set_03();
	void set_04();
	void set_05();
	void set_06();
	void set_07();
	void set_08();
	void set_09();


private:

};

#endif 

#include "lfo_triangle.h"

LFO_TRIANGLE::LFO_TRIANGLE()
{};

void LFO_TRIANGLE::initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc){
	ws = _ws;
	wc = _wc;
	wf = _wf;

	lenght = step = sample = 0;
	up_down = 1;
};

LFO_TRIANGLE::~LFO_TRIANGLE(){
};

double LFO_TRIANGLE::create(double _sr, double _amp, double _hz, double _phase, bool _synch, short _positive){

	if(phase_old != _phase){
		phase_old = _phase;
		lenght = _sr/2.0 / _hz; 
		step = _amp*2.0 / lenght;
		double phase_offset = lenght / (360.0 / _phase) * 2.0;
		for(double i = 0; i < phase_offset; i++){
			calc(_amp);
		};
	};

	if(volume_old != _amp || hz_old != _hz){
		volume_old = _amp;
		hz_old = _hz;
		lenght = _sr/2.0 / _hz; 
		step = _amp*2.0 / lenght; 
	};

	//синхронизация
	if(_synch == 1){
		if(ws->daw.playing == 1){
			calc(_amp);
			return sample;
		}else{
			reset();
			return sample;
		};
	}else{
		calc(_amp);
		return sample;
	};
};

void LFO_TRIANGLE::calc(double _volume){
	//направление
	if(sample + step >= _volume)
		up_down = -1;
	else if(sample - step <= _volume*-1)
		up_down = 1;
	//считаем
	if(up_down == 1)
		sample += step;
	else
		sample -= step;
};

void LFO_TRIANGLE::reset(){
	sample = 0;
	up_down = 1;
};
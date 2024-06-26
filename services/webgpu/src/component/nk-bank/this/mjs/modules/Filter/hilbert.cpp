#include "hilbert.h"

HILBERT::HILBERT()
{};

void HILBERT::initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc){

	ws = _ws;
	wf = _wf;
	wc = _wc;

	ap = new AP[32];
	for(int i = 0; i < 32; i++)
		ap[i].initialize(2);

	delay = new DELAY[2];	
	delay[0].initialize(ws, wf, wc);
	delay[1].initialize(ws, wf, wc);

	coeff[0][0] = 0.150069;
	coeff[0][1] = 0.453848;
	coeff[0][2] = 0.708102;
	coeff[0][3] = 0.858996;
	coeff[0][4] = 0.935362;
	coeff[0][5] = 0.971513;
	coeff[0][6] = 0.988669;
	coeff[0][7] = 0.998062;

	coeff[1][0] = 0.0406273;
	coeff[1][1] = 0.298439;
	coeff[1][2] = 0.593846;
	coeff[1][3] = 0.795335;
	coeff[1][4] = 0.90407;
	coeff[1][5] = 0.956837;
	coeff[1][6] = 0.981597;
	coeff[1][7] = 0.993872;

	/*coeff[0][0] = 0.0230967473505513;
	coeff[0][1] = 0.0890786646016417;
	coeff[0][2] = 0.18927268258064123;
	coeff[0][3] = 0.31272888647447905;
	coeff[0][4] = 0.4496785474519873;
	coeff[0][5] = 0.5941622883735814;
	coeff[0][6] = 0.7455420095572707;
	coeff[0][7] = 0.9094772373101924;

	coeff[1][0] = 0.0230967473505513;
	coeff[1][1] = 0.0890786646016417;
	coeff[1][2] = 0.18927268258064123;
	coeff[1][3] = 0.31272888647447905;
	coeff[1][4] = 0.4496785474519873;
	coeff[1][5] = 0.5941622883735814;
	coeff[1][6] = 0.7455420095572707;
	coeff[1][7] = 0.9094772373101924;*/
};

HILBERT::~HILBERT()
{
	delete delay;
	delete[] ap;
};

void HILBERT::create(double* _out1, double* _out2, double _in1, double _in2, double knob){
	
	sin_0[0] = ap[0].create(_in1,     coeff[0][0]);
	sin_0[1] = ap[1].create(sin_0[0], coeff[0][1]);
	sin_0[2] = ap[2].create(sin_0[1], coeff[0][2]);
	sin_0[3] = ap[3].create(sin_0[2], coeff[0][3]);
	sin_0[4] = ap[4].create(sin_0[3], coeff[0][4]);
	sin_0[5] = ap[5].create(sin_0[4], coeff[0][5]);
	sin_0[6] = ap[6].create(sin_0[5], coeff[0][6]);
	sin_0[7] = ap[7].create(sin_0[6], coeff[0][7]);
	delay[0].create_delay(&sin_0[8], sin_0[7], 1, 0, 0, 0);

	cos_0[0] = ap[8 ].create(_in1,     coeff[1][0]);
	cos_0[1] = ap[9 ].create(cos_0[0], coeff[1][1]);
	cos_0[2] = ap[10].create(cos_0[1], coeff[1][2]);
	cos_0[3] = ap[11].create(cos_0[2], coeff[1][3]);
	cos_0[4] = ap[12].create(cos_0[3], coeff[1][4]);
	cos_0[5] = ap[13].create(cos_0[4], coeff[1][5]);
	cos_0[6] = ap[14].create(cos_0[5], coeff[1][6]);
	cos_0[7] = ap[15].create(cos_0[6], coeff[1][7]);

	sin_1[0] = ap[16].create(_in2,     coeff[0][0]);
	sin_1[1] = ap[17].create(sin_1[0], coeff[0][1]);
	sin_1[2] = ap[18].create(sin_1[1], coeff[0][2]);
	sin_1[3] = ap[19].create(sin_1[2], coeff[0][3]);
	sin_1[4] = ap[20].create(sin_1[3], coeff[0][4]);
	sin_1[5] = ap[21].create(sin_1[4], coeff[0][5]);
	sin_1[6] = ap[22].create(sin_1[5], coeff[0][6]);
	sin_1[7] = ap[23].create(sin_1[6], coeff[0][7]);
	delay[1].create_delay(&sin_1[8], sin_1[7], 1, 0, 0, 0);

	cos_1[0] = ap[24].create(_in2,     coeff[1][0]);
	cos_1[1] = ap[25].create(cos_1[0], coeff[1][1]);
	cos_1[2] = ap[26].create(cos_1[1], coeff[1][2]);
	cos_1[3] = ap[27].create(cos_1[2], coeff[1][3]);
	cos_1[4] = ap[28].create(cos_1[3], coeff[1][4]);
	cos_1[5] = ap[29].create(cos_1[4], coeff[1][5]);
	cos_1[6] = ap[30].create(cos_1[5], coeff[1][6]);
	cos_1[7] = ap[31].create(cos_1[6], coeff[1][7]);

	if(knob <= -1){
		*_out1 = (cos_0[7] * (1 + knob) ) - (sin_0[8] * (2 + knob) );
		*_out2 = cos_1[7];
	}else if(knob <= 0){
		*_out1 = (sin_0[8] * knob) + (cos_0[7] * (1 + knob));
		*_out2 = cos_1[7];
	}else if(knob <= 1){
		*_out1 = sin_0[8];
		*_out2 = (cos_1[7] * knob) + (sin_1[8] * (1 - knob));
	}else if(knob <= 2){
		*_out1 = sin_0[8];
		*_out2 = (sin_1[8] * (1 - knob) ) + (cos_1[7] * (2 - knob) );
	};
};


/*if(ws->slider_4 <= -1)
	*_out1 = (*_out2 * (1 + knob) ) - (*_out1 * (2 + knob) );
else if(ws->slider_4 <= 0)
	*_out1 = (*_out1 * knob) + (*_out2 * (1 + knob));
else if(ws->slider_4 <= 1)
	*_out2 = (*_out2 * knob) + (*_out1 * (1 - knob));
else if(ws->slider_4 <= 2)
	*_out2 = (*_out2 * (2 - knob) ) + (*_out1 * (1 - knob) );*/



#include "loop.h"

WaveProcess::WaveProcess()
{
}

WaveProcess::~WaveProcess()
{
}

int WaveProcess::Initialize(void* params)
{
	m_pApplication = (Application*)params;
	return 1;
}

void WaveProcess::Terminate()
{

}

void WaveProcess::Process(char* name)
{
	WaveFile&		wfile = m_pApplication->m_WaveFile;
	WaveFormat&		wformat = m_pApplication->m_WaveFormat;
	WaveBuffer*		wbuf = 0;

	if (wfile.Open(wformat, name, WAVE_READ))
	{
		std::cout << "nChannels: " << wformat.nChannels << std::endl;
		std::cout << "nBlockAlign: " << wformat.nBlockAlign << std::endl;
		std::cout << "nSamplePerSec: " << wformat.nSamplePerSec << std::endl;
		std::cout << "wBitsPerSample: " << wformat.wBitsPerSample << std::endl;
		std::cout << "nAvgBytesPerSec: " << wformat.nAvgBytesPerSec << std::endl;
		std::cout << "wFormatTag: " << wformat.wFormatTag << std::endl;
		std::cout << std::endl;

		wbuf = WaveBuffer::walloc(wformat.nChannels);

		if (wfile.Process(wformat, ProcessWaveFile, 512, (void*)wbuf))
			std::cout << "Read file success" << std::endl;
		else
			std::cout << "Read file failed" << std::endl;

		wfile.Close();
	}

	m_pApplication->AllocGraphModules(2);

	GraphModule** graph = m_pApplication->m_pGraphs;

	graph[0]->Initialize(m_pApplication);
	graph[1]->Initialize(m_pApplication);

	static GLfloat color1[] = { 1.0f, 0.7f, 0.5f, 1.0f };
	static GLfloat color2[] = { 0.0f, 1.0f, 0.0f, 1.0f };

	WaveFilters filter;

	int		delay = 10;
	int		delay_line = ((wformat.nSamplePerSec * 9) / 50) / 198;

	filter.delay.init(&filter);
	filter.delay.init_memory(&filter, delay);
	filter.line.init(&filter, delay_line);

	filter.osc.osc_substrate_s.deg[0] = 90;
	filter.osc.osc_substrate_s.deg[1] = 90;
	filter.osc.osc_substrate_s.deg[2] = 90;
	filter.osc.osc_substrate_s.deg[3] = 90;
	filter.osc.osc_substrate_s.deg[4] = 90;
	filter.osc.osc_substrate_s.deg[5] = 90;
	filter.osc.osc_substrate_s.deg[6] = 90;
	filter.osc.osc_substrate_s.deg[7] = 90;

	filter.osc.osc_substrate_s.step[0] = 0.25;
	filter.osc.osc_substrate_s.step[1] = 0.25;
	filter.osc.osc_substrate_s.step[2] = 0.25;
	filter.osc.osc_substrate_s.step[3] = 0.25;
	filter.osc.osc_substrate_s.step[4] = 0.25;
	filter.osc.osc_substrate_s.step[5] = 0.25;
	filter.osc.osc_substrate_s.step[6] = 0.25;
	filter.osc.osc_substrate_s.step[7] = 0.25;

	filter.osc.osc_substrate_s.quarter[0] = 0;
	filter.osc.osc_substrate_s.quarter[1] = 0;
	filter.osc.osc_substrate_s.quarter[2] = 0;
	filter.osc.osc_substrate_s.quarter[3] = 0;
	filter.osc.osc_substrate_s.quarter[4] = 0;
	filter.osc.osc_substrate_s.quarter[5] = 0;
	filter.osc.osc_substrate_s.quarter[6] = 0;
	filter.osc.osc_substrate_s.quarter[7] = 0;

	filter.osc.osc_substrate_s.step_phase[0] = 0;
	filter.osc.osc_substrate_s.step_phase[1] = 0;
	filter.osc.osc_substrate_s.step_phase[2] = 0;
	filter.osc.osc_substrate_s.step_phase[3] = 0;
	filter.osc.osc_substrate_s.step_phase[4] = 0;
	filter.osc.osc_substrate_s.step_phase[5] = 0;
	filter.osc.osc_substrate_s.step_phase[6] = 0;
	filter.osc.osc_substrate_s.step_phase[7] = 0;

	filter.osc.osc_substrate_d.dynamic_phase[0] = 3;
	filter.osc.osc_substrate_d.dynamic_phase[1] = 0;
	filter.osc.osc_substrate_d.dynamic_phase[2] = 0;
	filter.osc.osc_substrate_d.dynamic_phase[3] = 0;
	filter.osc.osc_substrate_d.dynamic_phase[4] = 0;
	filter.osc.osc_substrate_d.dynamic_phase[5] = 0;
	filter.osc.osc_substrate_d.dynamic_phase[6] = 0;
	filter.osc.osc_substrate_d.dynamic_phase[7] = 0;

	for (int i = 0; i < 8; i++){
		quarter_temp[i] = 1000;
		step_phase_temp[i] = 1000;
		dynamic_phase_temp[i] = 1000;
		deg_temp[i] = 1000;
	}
	//std::cout << dynamic_phase_temp[0] << std::endl;

	filter.hilbert.init(&filter);
	filter.memory((wbuf->wlen + delay + delay_line));

	int i = 0;
	int j = 1;

	int test = 0;

	while (i < j){

		test++;

		if (test == 1000/4-4*12)
			filter.osc.osc_substrate_s.step_phase[0] = 1;

		double dval = wbuf->wbuffers[0][i];
		filter.delay.core_delay(dval);

		osc_call_back(filter.osc.osc_substrate_s, filter.osc.osc_substrate_d);

		if (osc_ini.osc_first_init == 1)
		{
			filter.osc.init(&filter);
			filter.osc.osc_init_00(&filter);
		}
		if (osc_ini.osc_second_init == 1)
		{

		}
		if (osc_ini.osc_third_init == 1)
		{
			filter.osc.osc_init_01(&filter);
		}

		filter.osc.osc_core(osc_ini.osc_first_init, osc_ini.osc_second_init, osc_ini.osc_third_init);

		filter.line.core_line(filter.osc.osc_out[0].line);
		filter.hilbert.hilbert_core(dval);

		filter.graph_00[i] = (float)filter.line.line_out.write[0];
		filter.graph_01[i] = (float)filter.line.line_out.sin_phase;

		j = (wbuf->wlen /*+ delay*/ + delay_line);
		i++;
	}

	graph[0]->SetBuffer(filter.graph_00, (wbuf->wlen + delay + delay_line), color1);
	graph[1]->SetBuffer(filter.graph_01, (wbuf->wlen + delay + delay_line), color2);

	graph[0]->SetSelection(0, 300);
	graph[1]->SetSelection(0, 300);

	//filter.Terminate();

	wformat.nChannels = 1;
	wformat.nSamplePerSec = 44100;
	wformat.wBitsPerSample = 16;
	wformat.wFormatTag = 1;


	if (wfile.Open(wformat, "00_01_temp.wav", WAVE_WRITE))
	{
		if (wfile.Write(wformat, &filter.graph_00, (wbuf->wlen + delay + delay_line)))
			std::cout << "Write file success" << std::endl;
		else
			std::cout << "Write file failed" << std::endl;
		wfile.Close();
	}
	if (wfile.Open(wformat, "00_02_temp.wav", WAVE_WRITE))
	{
		if (wfile.Write(wformat, &filter.graph_01, (wbuf->wlen + delay + delay_line)))
			std::cout << "Write file success" << std::endl;
		else
			std::cout << "Write file failed" << std::endl;
		wfile.Close();
	}

	//WaveBuffer::wfree(wbuf);
	//wbuf = 0;
};

void WaveProcess::ProcessWaveFile(WaveFormat &fmt, float** buffers, size_t len, void* ptrParam)
{
	WaveBuffer* loop = (WaveBuffer*)ptrParam;
	loop->wlen += len;

	for (int i = 0; i < fmt.nChannels; i++)
	{

		loop->wbuffers[i] = (float*)realloc(loop->wbuffers[i], loop->wlen*sizeof(float));
		for (int j = 0; j < len; j++)
		{
			double dval = buffers[i][j];

			loop->wbuffers[i][loop->wlen - len + j] = dval;
		}

	}

};


void WaveProcess::osc_call_back(osc_substrate_static in_s, osc_substrate_dynamic in_d){

	for (int i = 0; i < 8; i++){

		if (quarter_temp[i] != in_s.quarter[i] || step_phase_temp[i] != in_s.step_phase[i]){
			osc_ini.osc_first_init = 1;
			break;
		}
		else{
			osc_ini.osc_first_init = 0;
		}
	}

	for (int i = 0; i < 8; i++){

		if (dynamic_phase_temp[i] != in_d.dynamic_phase[i])
		{
			osc_ini.osc_second_init = 1;
			break;
		}
		else
		{
			osc_ini.osc_second_init = 0;
		}
	}

	for (int i = 0; i < 8; i++)
	{
		if (deg_temp[i] != in_s.deg[i])
		{
			osc_ini.osc_third_init = 1;
			break;
		}
		else
		{
			osc_ini.osc_third_init = 0;
		}
	}

	for (int i = 0; i < 8; i++){

		quarter_temp[i] = in_s.quarter[i];
		step_phase_temp[i] = in_s.step_phase[i];
		dynamic_phase_temp[i] = in_d.dynamic_phase[i];
		deg_temp[i] = in_s.deg[i];
	}
};

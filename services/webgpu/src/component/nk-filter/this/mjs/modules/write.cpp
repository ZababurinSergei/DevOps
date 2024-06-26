
#include "write.h"


WRITE::WRITE()
{
	sys_00_00 = new double[8];
	sys_00_01 = new double[8];
	sys_00_02 = new double[8];
	sys_00_03 = new double[8];
}

WRITE::~WRITE()
{
	delete[] sys_00_00;
	delete[] sys_00_00;
	delete[] sys_00_00;
	delete[] sys_00_00;
}

int WRITE::Initialize(void* params)
{
	m_pApplication = (Application*)params;

	// инициализация переменных

	return 1;
}

void WRITE::Terminate()
{
	// удаление переменных

}
int WRITE::malloc_buffers(int len)
{
	out_00_00 = (double*)malloc(len * sizeof(double));
	out_00_01 = (double*)malloc(len * sizeof(double));
	out_00_02 = (double*)malloc(len * sizeof(double));
	out_00_03 = (double*)malloc(len * sizeof(double));

	return 0;
}

int WRITE::realloc_buffers(int len)
{
	out_00_00 = (double*)realloc(out_00_00, len * sizeof(double));
	out_00_01 = (double*)realloc(out_00_01, len * sizeof(double));
	out_00_02 = (double*)realloc(out_00_02, len * sizeof(double));
	out_00_03 = (double*)realloc(out_00_03, len * sizeof(double));

	return 0;
}


void WRITE::core_write(){

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	sys_00_00[i_l[0]] = w_l->dval;

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	out_00_00[w_l->j_w] = sys_00_00[i_l[0 * 4 + 0]];

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};


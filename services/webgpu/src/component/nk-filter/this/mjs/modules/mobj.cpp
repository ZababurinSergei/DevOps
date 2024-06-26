#include "mobj.h"

Mobj::Mobj(){};

Mobj::~Mobj(){};

int Mobj::Process(float ** input, float** output, size_t len, int nChannels)
{
	for (int i = 0; i < nChannels; i++)
	{
		for (size_t j = 0; j < len; j++)
			output[i][j] = input[i][j];
	}
	return 0;
}
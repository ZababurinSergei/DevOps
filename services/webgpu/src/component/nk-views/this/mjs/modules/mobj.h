#ifndef _MOBJ_H_
#define _MOBJ_H_


class Mobj
{
public:
	Mobj();
	~Mobj();

	int Process(float ** input, float** output, size_t len, int nChannels);

private:
};
#endif //_MOBJ_H_

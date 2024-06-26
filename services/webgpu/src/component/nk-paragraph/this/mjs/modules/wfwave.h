#ifndef _GLWAVE_H_
#define _GLWAVE_H_

class CSystemWave
{
public:
	virtual int		Initialize(void* params) = 0;
	virtual void	Terminate() = 0;
};

class CCoreWave : public CSystemWave
{
public:
	virtual void	Play() = 0;
	virtual void	Events(CCoreWave* wave, UINT message, WPARAM wparam, LPARAM lparam) = 0;
};

class CCoreModuleWave : public CCoreWave
{
public:

	int CoreModuleInit()
	{

		return 1;
	}
		
	void CoreModuleTerm()
	{

	}

protected:


};

#endif //_GLWave_H_
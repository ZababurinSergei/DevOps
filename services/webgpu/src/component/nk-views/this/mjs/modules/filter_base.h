#ifndef _FILTER_BASE_H_
#define _FILTER_BASE_H_

#include <iostream>
#include "glbase.h"

class CFilterBase : public CSystemBase
{
public:

	virtual int		Initialize(void* params) = 0;
	virtual void	Terminate() = 0;

	virtual double	Bus_in_master() = 0;
	virtual double	Bus_in_1() = 0;
	virtual double	Bus_in_2() = 0;
	virtual double	Bus_in_3() = 0;
	virtual double	Bus_in_4() = 0;
	virtual double	Bus_in_5() = 0;
	virtual double	Bus_in_6() = 0;
	virtual double	Bus_in_7() = 0;
	virtual double	Bus_in_8() = 0;

	virtual double	Bus_out_master() = 0;
	virtual double	Bus_out_1() = 0;
	virtual double	Bus_out_2() = 0;
	virtual double	Bus_out_3() = 0;
	virtual double	Bus_out_4() = 0;
	virtual double	Bus_out_5() = 0;
	virtual double	Bus_out_6() = 0;
	virtual double	Bus_out_7() = 0;
	virtual double	Bus_out_8() = 0;

protected:


};

#endif

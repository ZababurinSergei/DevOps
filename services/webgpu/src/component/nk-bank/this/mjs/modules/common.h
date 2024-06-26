
#ifndef COMMON_H
#define COMMON_H

#include <iostream>
#include <iomanip>

class WaveFilters;

struct show_param{
	int			 stop;
};

class COMMON

{
public:
	COMMON();
	~COMMON();

	 WaveFilters*parent;
	 show_param		show_p{};

	 void			init(WaveFilters* wfilters);

	 void			show_00(double  in_01, double  in_02, double  in_03, double  in_04, double  in_05, double  in_06, double  in_07, double  in_08, double  in_09, double  in_10, double in_11, double in_12, double in_13, double in_14, double in_15, int lenght_s, int preset);
	 double			chek_nan(double a);
	 inline bool	check_mod(double a);
	 void			swap(int a, int b);
	

private:

};


#endif 
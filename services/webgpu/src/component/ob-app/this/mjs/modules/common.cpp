
#include "common.h"


COMMON::COMMON()
{
}

COMMON::~COMMON()
{
}


void COMMON::init(WaveFilters* wfilters){

	show_p.stop = -1;

	parent = wfilters;
}

double COMMON::chek_nan(double a){
	if (a != a)
		a = 0;
	if (a > 0 && a / a != a / a)
		a = 0;
	else if (a < 0 && a / a != a / a)
		a = 0;
	return a;
};

inline bool COMMON::check_mod(double a)
{
	double param, fractpart, intpart;
	fractpart = modf((double)a, &intpart);
	param = intpart / 2;
	fractpart = modf(param, &intpart);

	if (fractpart == 0)
		return true;
	return false;
};

void COMMON::swap(int a, int b)
{
	int t;
	t = b;
	b = a;
	a = t;
}


void COMMON::show_00(double  in_01, double  in_02, double  in_03, double  in_04, double  in_05, double  in_06, double  in_07, double  in_08, double  in_09, double  in_10, double in_11, double in_12, double in_13, double in_14, double in_15, int lenght_s, int preset){

	show_p.stop++;

	if (show_p.stop >= lenght_s)
		show_p.stop = 0;

	if (preset == 0){
		std::cout << in_01 << " " << in_02 << " " << in_03 << "||" << in_04 << " " << in_05 << " " << in_06 << "||" << in_07 << " " << in_08 << " " << in_09 << "||" << in_10 << " " << in_11 << " " << in_12 << "||" << in_13 << " " << in_14 << std::endl;
	}
	else if (preset == 1){
		std::cout << in_01 << "" << in_02 << "" << in_03 << "" << in_04 << "" << in_05 << "" << in_06 << " " << in_07 << " " << in_08 << "||" << in_09 << " " << in_10 << " " << in_11 << "||" << in_12 << " " << in_13 << " " << " " << in_14 << std::endl;
	}
	else if (preset == 2){
		std::cout << std::setw(2) << in_01 << std::setw(2) << in_02 << std::setw(2) << in_03 << std::setw(2) << in_04 << "   " << std::setw(2) << in_05 << std::setw(2) << in_06 << std::setw(2) << in_07 << std::setw(2) << in_08 << "    " << std::endl;
	}
	else if (preset == 3){
		std::cout << in_01 << "" << in_02 << "" << in_03 << "" << in_04 << "" << in_05 << "" << in_06 << "    " << in_07 << "" << in_08 << "" << in_09 << "" << in_10 << "   " << std::setw(3) << in_11 << "  " << std::setw(3) << in_12 << std::endl;
	}

	else if (preset == 4){

		if (in_13 > 1 || in_13 < -1 || in_13 == 0){
			std::cout << in_01 << " " << in_02 << " " << in_03 << " " << in_04 << " " << in_05 << " " << in_06 << " " << in_07 << "||" << in_08 << " " << in_09 << "||" << in_10 << " " << in_11 << "||" << in_12 << " " << in_13 << " " << in_14 << " " << in_15 << std::endl;
			getchar();
		}
	}
	else if (preset == 5){
		if (in_01 == 1 && in_02 == 1 && in_03 == 1 && in_04 == 2 && in_05 == 3 && in_06 == 1){
			std::cout << in_01 << "" << in_02 << "" << in_03 << "" << in_04 << "" << in_05 << "" << in_06 << "||" << in_07 << " " << in_08 << "||" << in_09 << " " << in_10 << " " << in_11 << "||" << in_12 << " " << in_13 << " " << in_14 << " " << in_15 << std::endl;
			getchar();
		}
	}

	if (show_p.stop == 0){
		getchar();
	}
}


#include "functions.h"

double modul(double a)
{
		if(a < 0)
				a *= -1;
	return a;
};

void set_0 (double* array, int size)
{
		for(int i = 0; i < size; i++)
				array[i] = 0;
};

double chek_nan(double a){
		if(a != a)
				a = 0;
		if(a > 0 && a / a != a / a)
				a= 0;
		else if(a < 0 && a / a != a / a)
				a = 0;
	return a;	
};

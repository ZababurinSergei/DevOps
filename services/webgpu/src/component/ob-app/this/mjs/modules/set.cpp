

#include "set.h"

SET::SET()
{

}

SET::~SET()
{
}


void SET::set_00(){

	setlocale(LC_ALL, "rus");

	int j = -1;
	int k = -1;

	for (int i = 0; i <10; i = i + 2){
		k++;
		if (k >= 4)
			k = 0;

		j++;
		std::cout << i << "  " << j << "  " << k << std::endl;
	}

};



void SET::set_01(float **input, int how){

	if (state->graph.draw == true && state->graph.active == true){
		for (int i = 0; i < how; i++){

			float in = input[0][i];

			if (in > buf_max)
				buf_max = in;
			if (in < buf_min)
				buf_min = in;

			if (buf_filter_count >= buf_filter){
				buf_filter_count = buf_filter_count - buf_filter;

				if (state->graph.db_cut == true){ //понижаем на 1 db
					buf_max *= one_db;
					buf_min *= one_db;
				}

				buf_mem_maxmin[buf_count * 2 + 0] = buf_max + 0.002f;
				buf_mem_maxmin[buf_count * 2 + 1] = buf_min - 0.002f;

				buf_max = -1000.0f;
				buf_min = 1000.0f;

				buf_count++;
				if (buf_count >= state->graph.buffer_size)
					buf_count = 0;
				buf_position = buf_count;
			};
			buf_filter_count++;
		};
	};

	std::cout << "set_01" << std::endl; getchar();
};


void SET::set_02(){
	
	
	
	
	std::cout << "set_02" << std::endl; getchar();
};

void SET::set_03(){ std::cout << "set_03" << std::endl; getchar(); };

void SET::set_04(){ std::cout << "set_04" << std::endl; getchar(); };

void SET::set_05(){ std::cout << "set_05" << std::endl; getchar(); };

void SET::set_06(){ std::cout << "set_06" << std::endl; getchar(); };

void SET::set_07(){ std::cout << "set_07" << std::endl; getchar(); };

void SET::set_08(){ std::cout << "set_08" << std::endl; getchar(); };

void SET::set_09(){ std::cout << "set_09" << std::endl; getchar(); };
#ifndef _IOFILE_H_
#define _IOFILE_H_

#include <string>
#include <vector>
#include "wavebuffer.h"
#include "waveformat.h"




class IOFilter;

struct IOBusObject
{
	std::string name;
	IOFilter* filter;
};

extern IOBusObject g_BusObjects[];

class IOUnique {
public:
	IOUnique() { m_nUnique = 0; }
	IOUnique(int unique) { m_nUnique = unique; }
	int unique() { return ++m_nUnique; }
protected:
	int m_nUnique;
};

class IOFile
{
public:
	IOFile() {
		m_nID = -1;
		m_strFileName = "";
	};
	void SetFileName(std::string file)
	{
		m_strFileName = file;
	}
	std::string GetFileName()
	{
		return m_strFileName;
	}
	void SetID(int id)
	{
		m_nID = id;
	}
	int GetID()
	{
		return m_nID;
	}
protected:
	int				m_nID;
	std::string		m_strFileName;

public:
	WaveFormat		m_pWaveFormat;
	WaveBuffer*		m_pWaveBuffer;
};

class IOFiles : public IOUnique
{
public:
	IOFiles() {}
	virtual ~IOFiles()
	{
		for (int i = 0; i < m_vectorFiles.size(); i++)
		{
			delete m_vectorFiles[i];

			std::vector<IOFile*>::iterator it = m_vectorFiles.begin();
			std::advance(it, i);

			m_vectorFiles.erase(it);
			break;
		}
	}

	IOFile* create_file(std::string file)
	{
		IOFile* io = new IOFile();
		if (io)
		{
			io->SetFileName(file);
			io->SetID(unique());

			m_vectorFiles.push_back(io);
			return io;
		}

		return nullptr;
	}

	IOFile* get_file(int id)
	{
		for (int i = 0; i < m_vectorFiles.size(); i++)
		{
			if (m_vectorFiles[i]->GetID() == id)
				return m_vectorFiles[i];
		}
		return nullptr;
	}

	void delete_file(IOFile* io)
	{
		for (int i = 0; i < m_vectorFiles.size(); i++)
		{
			if (m_vectorFiles[i] == io)
			{
				std::vector<IOFile*>::iterator it = m_vectorFiles.begin();
				std::advance(it, i);
				m_vectorFiles.erase(it);
				break;
			}
		}
	}
	int size()
	{
		return  m_vectorFiles.size();
	}
public:
	std::vector<IOFile*> m_vectorFiles;
};

class IOFilter
{
public:
	int	nID;
	int nBusIn;
	int nBusOut;
	int nChannels;
	int nPlay;
	int nWrite;
	int nGraph;
	int l_r;
	int sBus1;
	int sBus2;
	int sBus3;
	int sBus4;
	int sBus5;
	int sBus6;
	int sBus7;
	int sBus8;
	int s1ID;
	int s2ID;
	int s3ID;
	int s4ID;
	int s5ID;
	int s6ID;
	int s7ID;
	int s1nTag;
	int s1oTag;
	int s2nTag;
	int s2oTag;
	int s3nTag;
	int s3oTag;
	int s4nTag;
	int s4oTag;
	int s5nTag;
	int s5oTag;
	int s6nTag;
	int s6oTag;
	int s7nTag;
	int s7oTag;
	int nTag;
	int oTag;
	int nSourceBusTypeIn;			// 1 - file; 0 - filter
	int nSourceBusTypeOut;			// 1 - file; 0 - filter
	int Subobject;
	int param_0;
	int param_1;
	int param_2;
	int param_3;
	int param_4;
	int param_5;
	int param_6;
	int param_7;
	std::string strNameFilter;

	void SetFilterName(std::string filter)
	{
		strNameFilter = filter;
	}

	std::string GetFilterName()
	{
		return strNameFilter;
	}
};

class IOFilters : public IOUnique
{
public:
	IOFilters(){}
	virtual ~IOFilters()
	{
		for (int i = 0; i < vectorFilter.size(); i++)
		{
			delete vectorFilter[i];

			std::vector<IOFilter*>::iterator it = vectorFilter.begin();
			std::advance(it, i);
			vectorFilter.erase(it);
			break;
		}


	}

	void delete_filter(int id)
	{
		for (int i = 0; i < vectorFilter.size(); i++)
		{
			if (vectorFilter[i]->nID == id)
			{
				delete vectorFilter[i];

				std::vector<IOFilter*>::iterator it = vectorFilter.begin();
				std::advance(it, i);
				vectorFilter.erase(it);
			}
		}
	}

	IOFilter* append_filter()
	{
		IOFilter* obj = new IOFilter();
		if (obj)
		{
			obj->nID = unique();
			obj->nBusIn = 0;
			obj->nBusOut = 0;
			obj->nChannels = 0;
			obj->nPlay = -1;
			obj->nWrite = -1;
			obj->nGraph = -1;
			obj->l_r = -1;
			obj->nTag = -1;
			obj->oTag = -1;
			obj->sBus1 = -1;
			obj->sBus2 = -1;
			obj->sBus3 = -1;
			obj->sBus4 = -1;
			obj->sBus5 = -1;
			obj->sBus6 = -1;
			obj->sBus7 = -1;
			obj->sBus8 = -1;
			obj->s1ID = -1;
			obj->s2ID = -1;
			obj->s3ID = -1;
			obj->s4ID = -1;
			obj->s5ID = -1;
			obj->s6ID = -1;
			obj->s7ID = -1;
			obj->s1nTag = -1;
			obj->s1oTag = -1;
			obj->s2nTag = -1;
			obj->s2oTag = -1;
			obj->s3nTag = -1;
			obj->s3oTag = -1;
			obj->s4nTag = -1;
			obj->s4oTag = -1;
			obj->s5nTag = -1;
			obj->s5oTag = -1;
			obj->s6nTag = -1;
			obj->s6oTag = -1;
			obj->s7nTag = -1;
			obj->s7oTag = -1;
			obj->nSourceBusTypeIn = 0;
			obj->nSourceBusTypeOut = 0;
			obj->strNameFilter = "";
			vectorFilter.push_back(obj);
			return obj;
		}
		return nullptr;
	}

	void delete_all()
	{
		for (int i = 0; i < vectorFilter.size(); i++)
		{
			delete vectorFilter[i];
		}
		vectorFilter.clear();
	}

	IOFilter* get_filter(int id)
	{
		for (int i = 0; i < vectorFilter.size(); i++)
		{
			if (vectorFilter[i]->nID == id)
			{
				return vectorFilter[i];
			}
		}
		return nullptr;
	}
protected:
	std::vector<IOFilter*> vectorFilter;
};

class IOObject
{
public:
	IOFilters m_filters;
	IOFiles m_files;

	void delete_file(IOFile* io)
	{
		m_files.delete_file(io);
	}

	IOFile* get_file(int id)
	{
		return m_files.get_file(id);
	}

	IOFile* create_file(std::string file)
	{
		m_files.create_file(file);
	}

	void delete_filter(int id)
	{
		m_filters.delete_filter(id);
	}

	void delete_all()
	{
		m_filters.delete_all();
	}

	IOFilter* append_filter()
	{
		return m_filters.append_filter();
	}
	IOFilter* get_nextfilter(IOFilter* filter)
	{
		IOFilter* f = filter;
		if (f->nBusOut)
		{
			f = get_filter(filter->nBusOut);
		}
		return f;
	}
	IOFilter* get_lastfilter(IOFilter* filter)
	{
		IOFilter* f = filter;
		while (f->nBusOut)
		{
			f = get_filter(filter->nBusOut);
		}
		return f;
	}
	IOFilter* get_filter(std::string filter)
	{
		int index = 0;
		IOBusObject* obj = &g_BusObjects[0];
		do
		{
			if (obj->name == filter)
			{
				return obj->filter;
				break;
			}
			obj = &g_BusObjects[++index];
		} while (obj->name != "");
		return nullptr;
	}

	IOFilter* get_filter(int id)
	{
		return m_filters.get_filter( id );
	}
};


#endif // _IOFILE_H_

interface PaginatedData<T> {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    data: T[];
  }
  
  function paginate<T>(data: T[], page: number, limit: number): PaginatedData<T> {
    const offset = (page - 1) * limit;
    const paginatedData = data.slice(offset, offset + limit);
  
    return {
      totalCount: data.length,
      totalPages: Math.ceil(data.length / limit),
      currentPage: page,
      data: paginatedData,
    };
  }
  
  export default paginate;
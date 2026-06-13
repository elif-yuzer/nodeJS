"use strict";
/* -------------------------------------------------------
         EXPRESSJS - Query Handler Middleware
------------------------------------------------------- */

module.exports = async (req, res, next) => {

    /* FILTERING & SEARCHING & SORTING & PAGINATION */


    //* FILTERING
    // URL?filter[fieldName1]=value1&filter[fiedlName2]=value2
    const filter = req.query?.filter || {}

    //* SEARCHING
    // URL?search[fieldName1]=value1&search[fiedlName2]=value2
    const search = req.query?.search || {}

    for (let key in search) search[key] = { $regex: search[key], $options: 'i' }

    //* SORTING
    // URL?sort[fieldName1]=value1&sort[fiedlName2]=value2
    const sort = req.query?.sort || {};

    //* PAGINATIONS:

    // PAGE
    // URL?page=2
    let page = parseInt(req.query?.page);
    page = page > 0 ? page : 1

    // LIMIT
    // URL?limit=20
    let limit = parseInt(req.query?.limit);
    limit = limit > 0 ? limit : 20

    // SKIP
    // URL?skip=10
    let skip = parseInt(req.query?.skip);
    skip = skip > 0 ? skip : (page - 1) * limit;


    // GetModelList
    res.getModelList = async (Model, customFilter = {}, populate = null) => {
        return await Model.find({ ...search, ...filter, ...customFilter }).sort(sort).skip(skip).limit(limit).populate(populate);
    }

    // GetModelListDetatils
    res.getModelListDetails = async (Model, customFilter = {}) => {
        const count = await Model.countDocuments({ ...search, ...filter, ...customFilter });

        return {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            totalRecords: count,
            pages: count <= limit ? false : {
                previos: (page > 1 ? page - 1 : false),
                current: page,
                next: page < Math.ceil(count / limit) ? page + 1 : false,
                total: Math.ceil(count / limit)
            }
        }
    }

    next();
}
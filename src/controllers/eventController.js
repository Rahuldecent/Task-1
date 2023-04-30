const eventModel = require('../models/eventModel');
const path = require('path');
// =================create an events using post api================================

exports.createEvent = async (req, res) => {
    let data = req.body
    const { type, name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = data
    if (req.file) {
        data.image = req.file.path
    }
    if (!data.image) {
        res.send({ status: false, msg: "image is required" })
    }
    const eventCreated = await eventModel.create(data)
    return res.status(201).send({ status: true, msg: "successfully event created", data: eventCreated })
}

//==================Gets an event by its unique id=====================
exports.getEventByid = async (req, res) => {
    let id = req.query.id
    if (!id) return res.send({ msg: "Please enter Id " })
    const getEvent = await eventModel.findById({ _id: id });
    if (!getEvent) {
        return res
            .status(404)
            .send({ status: false, message: "Event Id not found" });
    }
    else return res.send({ status: true, data: getEvent });
}
//==================show if resources available otherwise create===========

exports.updateEvent = async (req, res) => {
    let id = req.params.id
    let data = req.body
    const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = data
    if (req.file) {
        data.image = req.file.path
    }
    if (!data.image) {
        res.send({ status: false, msg: "image is required" })
    }
    if (!id) return res.status(404).send({ msg: "Please enter id " });
    const eventUpdated = await eventModel.findByIdAndUpdate({ _id: id }, {
        $set: {
            name: data.name,
            image: req.file.path,
            tagline: data.tagline,
            schedule: data.schedule,
            description: data.description,
            moderator: data.moderator,
            category: data.category,
            sub_category: data.sub_category,
            rigor_rank: data.rigor_rank
        }
    })
    return res.status(200).send({ status: true, msg: "successfully updated" });
}


//=====================================Gets an event by its recency & paginate results by page number and limit of events per page=================================

exports.findEvent = async (req, res) => {
    let type = req.query.type
    let limit = req.query.limit
    let page = req.query.page
    const eventPerPage = 3;
    const eventFind = await eventModel.find({ type: type }).skip(page * eventPerPage).limit(eventPerPage).limit(limit)
    return res.send({ data: eventFind });
}
// ==================== Deletes an event based on its Unique Id==========
exports.deleteEvent = async (req, res) => {
    let id = req.params.id
    if (!id) return res.status(404).send({ msg: "Please enter id " });
    const getEvent = await eventModel.findByIdAndDelete({ _id: id });
    return res.send({ status: true, msg: " Event successfully deleted" })
}



const Feedbacks = require('../models/feedbacksModel');
const messageModel = require('../models/messagesModel');
const projectsModel = require('../models/projectsModel');
const Job = require('../models/jobsModel');
const JobApplication = require('../models/jobApplicationsModel');
const { Op } = require('sequelize');

const getAnalysis = async (req, res) => {
    try {
        const now = new Date();

        const ranges = {
            today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            thisWeek: new Date(now - 7 * 24 * 60 * 60 * 1000),
            thisMonth: new Date(now.getFullYear(), now.getMonth(), 1),
            last3Months: new Date(now.getFullYear(), now.getMonth() - 3, 1),
            thisYear: new Date(now.getFullYear(), 0, 1),
        };

        const countIn = (Model, from) =>
            Model.count({ where: { createdAt: { [Op.gte]: from } } });

        const [
            feedbacks_today,
            feedbacks_week,
            feedbacks_month,
            feedbacks_3months,
            feedbacks_year,
            feedbacks_total,
        ] = await Promise.all([
            countIn(Feedbacks, ranges.today),
            countIn(Feedbacks, ranges.thisWeek),
            countIn(Feedbacks, ranges.thisMonth),
            countIn(Feedbacks, ranges.last3Months),
            countIn(Feedbacks, ranges.thisYear),
            Feedbacks.count(),
        ]);

        const ratingResult = await Feedbacks.findOne({
            attributes: [
                [Feedbacks.sequelize.fn('AVG', Feedbacks.sequelize.col('rating')), 'avgRating'],
                [Feedbacks.sequelize.fn('COUNT', Feedbacks.sequelize.col('id')), 'total'],
            ],
            raw: true,
        });

        const ratingRows = await Feedbacks.findAll({
            attributes: [
                'rating',
                [Feedbacks.sequelize.fn('COUNT', Feedbacks.sequelize.col('id')), 'count'],
            ],
            group: ['rating'],
            raw: true,
        });
        const ratingDistribution = [1, 2, 3, 4, 5].map((r) => ({
            rating: r,
            count: Number(ratingRows.find((x) => Number(x.rating) === r)?.count ?? 0),
        }));

        const [
            messages_today,
            messages_week,
            messages_month,
            messages_3months,
            messages_year,
            messages_total,
        ] = await Promise.all([
            countIn(messageModel, ranges.today),
            countIn(messageModel, ranges.thisWeek),
            countIn(messageModel, ranges.thisMonth),
            countIn(messageModel, ranges.last3Months),
            countIn(messageModel, ranges.thisYear),
            messageModel.count(),
        ]);

        const [
            projects_today,
            projects_week,
            projects_month,
            projects_3months,
            projects_year,
            projects_total,
        ] = await Promise.all([
            countIn(projectsModel, ranges.today),
            countIn(projectsModel, ranges.thisWeek),
            countIn(projectsModel, ranges.thisMonth),
            countIn(projectsModel, ranges.last3Months),
            countIn(projectsModel, ranges.thisYear),
            projectsModel.count(),
        ]);

        const industryRows = await projectsModel.findAll({
            attributes: [
                'industry',
                [projectsModel.sequelize.fn('COUNT', projectsModel.sequelize.col('id')), 'count'],
            ],
            group: ['industry'],
            raw: true,
        });

        const [
            jobs_today,
            jobs_week,
            jobs_month,
            jobs_3months,
            jobs_year,
            jobs_total,
            jobs_published,
        ] = await Promise.all([
            countIn(Job, ranges.today),
            countIn(Job, ranges.thisWeek),
            countIn(Job, ranges.thisMonth),
            countIn(Job, ranges.last3Months),
            countIn(Job, ranges.thisYear),
            Job.count(),
            Job.count({ where: { status: 'Published' } }),
        ]);

        const [
            applications_today,
            applications_week,
            applications_month,
            applications_3months,
            applications_year,
            applications_total,
        ] = await Promise.all([
            countIn(JobApplication, ranges.today),
            countIn(JobApplication, ranges.thisWeek),
            countIn(JobApplication, ranges.thisMonth),
            countIn(JobApplication, ranges.last3Months),
            countIn(JobApplication, ranges.thisYear),
            JobApplication.count(),
        ]);

        const monthlyTrend = await Promise.all(
            Array.from({ length: 6 }, (_, i) => {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const from = new Date(d.getFullYear(), d.getMonth(), 1);
                const to   = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
                const label = d.toLocaleString('en-US', { month: 'short', year: '2-digit' });

                return Promise.all([
                    Feedbacks.count({ where: { createdAt: { [Op.between]: [from, to] } } }),
                    messageModel.count({ where: { createdAt: { [Op.between]: [from, to] } } }),
                    projectsModel.count({ where: { createdAt: { [Op.between]: [from, to] } } }),
                    JobApplication.count({ where: { createdAt: { [Op.between]: [from, to] } } }),
                ]).then(([feedbacks, messages, projects, applications]) => ({
                    month: label, feedbacks, messages, projects, applications,
                }));
            })
        );

        res.status(200).json({
            feedbacks: {
                total: feedbacks_total,
                today: feedbacks_today,
                this_week: feedbacks_week,
                this_month: feedbacks_month,
                last_3_months: feedbacks_3months,
                this_year: feedbacks_year,
                avg_rating: Number(ratingResult?.avgRating ?? 0).toFixed(1),
                rating_distribution: ratingDistribution,
            },
            messages: {
                total: messages_total,
                today: messages_today,
                this_week: messages_week,
                this_month: messages_month,
                last_3_months: messages_3months,
                this_year: messages_year,
            },
            projects: {
                total: projects_total,
                today: projects_today,
                this_week: projects_week,
                this_month: projects_month,
                last_3_months: projects_3months,
                this_year: projects_year,
                by_industry: industryRows.map((r) => ({ industry: r.industry || 'Other', count: Number(r.count) })),
            },
            jobs: {
                total: jobs_total,
                published: jobs_published,
                today: jobs_today,
                this_week: jobs_week,
                this_month: jobs_month,
                last_3_months: jobs_3months,
                this_year: jobs_year,
            },
            applications: {
                total: applications_total,
                today: applications_today,
                this_week: applications_week,
                this_month: applications_month,
                last_3_months: applications_3months,
                this_year: applications_year,
            },
            monthly_trend: monthlyTrend.reverse(),
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getAnalysis };
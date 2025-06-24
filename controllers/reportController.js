const reportModel = require('../models/reportModel');

exports.getSalesReport = (req, res) => {
    reportModel.getTotalSales((err, totalSalesResult) => {
        if (err) return res.status(500).json({ message: 'Failed to get total sales', error: err });

        reportModel.getBestSellingProducts((err, bestSellers) => {
            if (err) return res.status(500).json({ message: 'Failed to get best sellers', error: err });

            const threshold = req.query.threshold ? parseInt(req.query.threshold) : 10;

            reportModel.getLowStockProducts(threshold, (err, lowStockProducts) => {
                if (err) return res.status(500).json({ message: 'Failed to get low stock products', error: err });

                res.status(200).json({
                    totalSales: totalSalesResult[0].totalSales || 0,
                    bestSellingProducts: bestSellers,
                    lowStockAlerts: lowStockProducts
                });
            });
        });
    });
};

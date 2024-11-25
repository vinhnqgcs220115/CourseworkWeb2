const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');
const TestResult = mongoose.model('TestResult')

exports.list_all_words = (req, res) => {
    Vocab.find({}, (err, words) => {
        if (err) res.send(err);
        res.json(words);
    });
};

exports.create_a_word = (req, res) => {
    const newWord = new Vocab(req.body);
    newWord.save((err, word) => {
        if (err) res.send(err);
        res.json(word);
    });
};

exports.read_a_word = (req, res) => {
    Vocab.findById(req.params.wordId, (err, word) => {
        if (err) res.send(err);
        res.json(word);        
    });
};

exports.update_a_word = (req, res) => {
    Vocab.findOneAndUpdate(
        { _id: req.params.wordId },
        req.body,
        { new:true },
        (err, word) => {
            if (err) res.send(err);
            res.json(word);
        }
    );
};

exports.delete_a_word = (req, res) => {
    Vocab.deleteOne({ _id: req.params.wordId }, err => {
        if (err) res.send(err);
        res.json({
            message: 'Word successfully deleted',
            _id: req.params.wordId
        });
    });
};

exports.list_test_results = async (req, res) => {
    const { skip = 0, limit = 5 } = req.query;
    try {
        const results = await TestResult.find({})
            .sort({ index: -1 })
            .skip(Number(skip))
            .limit(Number(limit));

        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.create_test_result = async (req, res) => {
    try {
        // console.log("Received data:", req.body);
        const latestResult = await TestResult.findOne().sort({ index: -1 });
        const newResult = new TestResult({
            ...req.body,
            index: latestResult ? latestResult.index + 1 : 1,
            date: new Date().toLocaleString(),
        });

        const savedResult = await newResult.save();
        res.json(savedResult);
    } catch (err) {
        // console.error("Error saving test result:", err);
        res.status(500).send(err);
    }
};

exports.get_test_result = async (req, res) => {
    try {
        const result = await TestResult.findById(req.params.id);
        if (!result) {
            return res.status(404).send('Test result not found');
        }
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
};
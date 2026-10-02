const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
}

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Book Loan API" });
});

// GET /loans - Get all loans with optional status filter
app.get('/loans', async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
        const { status } = req.query;
        let query = supabase.from('loans').select('*');
        
        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /loans/:id - Get a loan by ID
app.get('/loans/:id', async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from('loans').select('*').eq('id', id).single();
        
        if (error) throw error;
        if (!data) return res.status(404).json({ error: "Loan not found" });
        
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /loans - Create a new loan
app.post('/loans', async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
        const { member_name, book_title, borrow_date, return_date, status } = req.body;
        const { data, error } = await supabase
            .from('loans')
            .insert([{ member_name, book_title, borrow_date, return_date, status }])
            .select();
            
        if (error) throw error;
        res.status(201).json({ data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /loans/:id - Update a loan
app.put('/loans/:id', async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
        const { id } = req.params;
        const { member_name, book_title, borrow_date, return_date, status } = req.body;
        
        const { data, error } = await supabase
            .from('loans')
            .update({ member_name, book_title, borrow_date, return_date, status })
            .eq('id', id)
            .select();
            
        if (error) throw error;
        if (data.length === 0) return res.status(404).json({ error: "Loan not found" });
        
        res.json({ data: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /loans/:id - Delete a loan
app.delete('/loans/:id', async (req, res) => {
    if (!supabase) return res.status(500).json({ error: "Supabase not configured" });
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('loans')
            .delete()
            .eq('id', id)
            .select();
            
        if (error) throw error;
        
        // Supabase delete might not return data if row didn't exist depending on config, but if it returns empty we can assume not found.
        res.json({ message: "Loan deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Only listen locally, Vercel will export the app
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;

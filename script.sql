-- INSERT INTO borrowedbooks (bookid, userid, duedate)
-- VALUES (9, 1, NOW()	+ interval '14 days');
SELECT (userid, duedate) FROM borrowedbooks WHERE userid = 1;
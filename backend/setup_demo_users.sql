-- Setup demo users for all 4 roles
-- System admin (role_id=5) - new user
-- Company admin (role_id=6) - maria.gomez@segurdata.com
-- Auditor (role_id=7) - carlos.rodriguez@cavaltec.com
-- Consultant (role_id=8) - ana.martinez@cavaltec.com

-- 1. Create a System Admin user (role_id=5, no company)
INSERT INTO users (company_id, role_id, first_name, last_name, email, password_hash, is_active, email_verified, created_at)
VALUES (1, 5, 'Super', 'Admin', 'superadmin@cavaltec.com', '$argon2id$v=19$m=65536,t=3,p=4$2vtfC+HcW4txrtX6v/d+zw$PQoPG9OIHzX/OO/xzMZbe6lSicyalArXuTmhALYygqw', 1, 1, NOW());

-- 2. Update admin@cavaltec.com to be the System Admin (role_id=5)
UPDATE users SET role_id = 5, password_hash = '$argon2id$v=19$m=65536,t=3,p=4$2vtfC+HcW4txrtX6v/d+zw$PQoPG9OIHzX/OO/xzMZbe6lSicyalArXuTmhALYygqw' WHERE email = 'admin@cavaltec.com';

-- 3. Set password for Company Admin (maria.gomez@segurdata.com)
UPDATE users SET password_hash = '$argon2id$v=19$m=65536,t=3,p=4$KeX8n1OqtfZeyxljTOn9fw$1a3COVFqa/YaVFTFVBxKgo3JfuG7zciTaVaYsN5FSNY' WHERE email = 'maria.gomez@segurdata.com';

-- 4. Set password for Auditor (carlos.rodriguez@cavaltec.com)
UPDATE users SET password_hash = '$argon2id$v=19$m=65536,t=3,p=4$cS4lxBgjRChFqBUipJQSog$1KmaCEMuWOTWoD7twHTtymhpKsbkjyh6uLeCW60IuL4' WHERE email = 'carlos.rodriguez@cavaltec.com';

-- 5. Set password for Consultant (ana.martinez@cavaltec.com)
UPDATE users SET password_hash = '$argon2id$v=19$m=65536,t=3,p=4$lvL+v5cSQmgNwfg/Z0wpRQ$RmXfr/Tt2CVT8O1blBlpIGi5deTbalTalLXZnEcA4VE' WHERE email = 'ana.martinez@cavaltec.com';

-- 6. Set password for other demo users (company admins)
UPDATE users SET password_hash = '$argon2id$v=19$m=65536,t=3,p=4$KeX8n1OqtfZeyxljTOn9fw$1a3COVFqa/YaVFTFVBxKgo3JfuG7zciTaVaYsN5FSNY' WHERE email IN ('luis.fernandez@privtotal.com', 'laura.sanchez@datatech.com', 'sofia.torres@infosecure.com', 'valentina.ortiz@greendata.com');

-- 7. Set password for other auditors
UPDATE users SET password_hash = '$argon2id$v=19$m=65536,t=3,p=4$cS4lxBgjRChFqBUipJQSog$1KmaCEMuWOTWoD7twHTtymhpKsbkjyh6uLeCW60IuL4' WHERE email IN ('andres.moreno@segurdata.com', 'diego.ramirez@datatech.com', 'valentina.ortiz@cavaltec.com');

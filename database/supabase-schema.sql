create extension if not exists pgcrypto;

create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password text not null,
  role text default 'admin',
  created_at timestamp default now()
);

delete from admins where email = 'admin@dental.com';

insert into admins (name, email, password, role)
values ('Betty Wong', 'ammaarahmd6@gmail.com', '$2b$12$7d5nvYJHnlRQF7.BtiwABuH2zjZQp/F7s/WaSNkL3CNOakbLqXawW', 'admin')
on conflict (email) do update
set name = excluded.name,
    password = excluded.password,
    role = excluded.role;

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  password text not null,
  phone text not null,
  country text not null,
  city text not null,
  address text not null,
  date_of_birth date not null,
  gender text not null,
  medical_history text not null,
  dental_concern text,
  preferred_service text,
  profile_completed boolean default false,
  created_at timestamp default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  category text not null,
  brand text,
  model text,
  short_description text,
  full_description text,
  key_features text,
  specifications jsonb,
  image_url text,
  status text default 'active',
  featured boolean default false,
  created_at timestamp default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  service_title text not null,
  service_description text,
  icon text,
  image_url text,
  status text default 'active',
  created_at timestamp default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  image_url text not null,
  created_at timestamp default now()
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  video_url text,
  thumbnail_url text,
  description text,
  created_at timestamp default now()
);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text,
  image_url text,
  content text,
  status text default 'published',
  created_at timestamp default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  country text,
  review text,
  rating int default 5,
  status text default 'active',
  created_at timestamp default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  country text,
  company_name text,
  interested_product text,
  message text,
  request_type text,
  preferred_contact text,
  appointment_date date,
  status text default 'unread',
  created_at timestamp default now()
);

alter table inquiries add column if not exists patient_id uuid references patients(id) on delete set null;
alter table inquiries add column if not exists request_type text;
alter table inquiries add column if not exists preferred_contact text;
alter table inquiries add column if not exists appointment_date date;

insert into storage.buckets (id, name, public)
values
  ('products', 'products', true),
  ('gallery', 'gallery', true),
  ('blogs', 'blogs', true),
  ('services', 'services', true),
  ('videos', 'videos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public product images are readable" on storage.objects;

create policy "Public product images are readable"
on storage.objects for select
using (bucket_id in ('products', 'gallery', 'blogs', 'services', 'videos'));

do $$
begin
  alter publication supabase_realtime add table inquiries;
exception
  when duplicate_object then null;
end $$;

insert into products (product_name, category, brand, model, short_description, full_description, key_features, specifications, image_url, featured)
select *
from (values
  ('Digital Intraoral Scanner', 'Intraoral Scanners', 'Betty Dental', 'BD Scan Pro', 'Wireless-ready scanner for accurate digital impressions and fast case transfer.', 'A premium digital scanner designed for clinics that need accuracy, comfort, and practical daily workflow support.', 'Powder-free scanning, AI tissue removal, fast export, ergonomic design', '{"usage":"Dental clinic","warranty":"1 Year","support":"Available","delivery":"International"}'::jsonb, 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80', true),
  ('5-Axis Dental Milling Machine', 'Dental Milling Machines', 'Betty CAD/CAM', 'BD Mill 5X', 'High precision milling for zirconia, PMMA, wax, and hybrid ceramic workflows.', 'A robust lab milling system for stable, repeatable restoration production with smart material handling.', '5-axis machining, automatic calibration, dry milling, compact footprint', '{"usage":"Dental lab and clinic","materialCompatibility":"Zirconia, PMMA, Wax","warranty":"1 Year","support":"Available","delivery":"International"}'::jsonb, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80', true)
) as seed(product_name, category, brand, model, short_description, full_description, key_features, specifications, image_url, featured)
where not exists (select 1 from products where products.product_name = seed.product_name);

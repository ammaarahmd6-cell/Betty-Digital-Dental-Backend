-- Seed content for Betty Digital Dental Solutions.
-- Run after database/supabase-schema.sql.

with product_seed(category, product_name, image_url, idx) as (
  values
  ('Intraoral Scanners','BD Scan Pro Wireless','https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',1),
  ('Intraoral Scanners','BD Scan Lite Clinic','https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',2),
  ('Intraoral Scanners','BD Scan AI Color','https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',3),
  ('Intraoral Scanners','BD Scan Cart System','https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',4),
  ('Intraoral Scanners','BD Scan Ortho Edition','https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',5),
  ('Dental CAD/CAM Systems','BD CAD Studio','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',1),
  ('Dental CAD/CAM Systems','BD CAM Nest Pro','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',2),
  ('Dental CAD/CAM Systems','BD Chairside CAD Kit','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',3),
  ('Dental CAD/CAM Systems','BD Lab Design Suite','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',4),
  ('Dental CAD/CAM Systems','BD Open Workflow System','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',5),
  ('Dental Milling Machines','BD Mill 5X Pro','https://images.unsplash.com/photo-1581092334247-27e8a9b9a9f7?auto=format&fit=crop&w=900&q=80',1),
  ('Dental Milling Machines','BD Mill Dry Compact','https://images.unsplash.com/photo-1581092334247-27e8a9b9a9f7?auto=format&fit=crop&w=900&q=80',2),
  ('Dental Milling Machines','BD Mill Wet Hybrid','https://images.unsplash.com/photo-1581092334247-27e8a9b9a9f7?auto=format&fit=crop&w=900&q=80',3),
  ('Dental Milling Machines','BD Mill Zircon Master','https://images.unsplash.com/photo-1581092334247-27e8a9b9a9f7?auto=format&fit=crop&w=900&q=80',4),
  ('Dental Milling Machines','BD Mill Chairside Mini','https://images.unsplash.com/photo-1581092334247-27e8a9b9a9f7?auto=format&fit=crop&w=900&q=80',5),
  ('Dental 3D Printers','BD Print Max Dental','https://images.unsplash.com/photo-1633113088983-cc3fe37f37b5?auto=format&fit=crop&w=900&q=80',1),
  ('Dental 3D Printers','BD Print Guide Pro','https://images.unsplash.com/photo-1633113088983-cc3fe37f37b5?auto=format&fit=crop&w=900&q=80',2),
  ('Dental 3D Printers','BD Print Model Fast','https://images.unsplash.com/photo-1633113088983-cc3fe37f37b5?auto=format&fit=crop&w=900&q=80',3),
  ('Dental 3D Printers','BD Print Splint System','https://images.unsplash.com/photo-1633113088983-cc3fe37f37b5?auto=format&fit=crop&w=900&q=80',4),
  ('Dental 3D Printers','BD Print Lab Production','https://images.unsplash.com/photo-1633113088983-cc3fe37f37b5?auto=format&fit=crop&w=900&q=80',5),
  ('Zirconia Blocks','BD Zircon HT Disc','https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',1),
  ('Zirconia Blocks','BD Zircon Multilayer','https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',2),
  ('Zirconia Blocks','BD Zircon Esthetic Block','https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',3),
  ('Zirconia Blocks','BD Zircon Implant Grade','https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',4),
  ('Zirconia Blocks','BD Zircon Super Translucent','https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',5),
  ('Dental Lab Equipment','BD Sintering Furnace','https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80',1),
  ('Dental Lab Equipment','BD Porcelain Furnace','https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80',2),
  ('Dental Lab Equipment','BD Model Scanner','https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80',3),
  ('Dental Lab Equipment','BD Lab Compressor','https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80',4),
  ('Dental Lab Equipment','BD Dust Collector','https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80',5),
  ('Dental Materials','BD Dental Resin Set','https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80',1),
  ('Dental Materials','BD PMMA Disc Pack','https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80',2),
  ('Dental Materials','BD Wax Milling Disc','https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80',3),
  ('Dental Materials','BD Ceramic Stain Kit','https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80',4),
  ('Dental Materials','BD Polishing Tool Set','https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80',5),
  ('Implant Planning Solutions','BD Implant Guide Kit','https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',1),
  ('Implant Planning Solutions','BD Surgical Guide Workflow','https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',2),
  ('Implant Planning Solutions','BD CBCT Planning Suite','https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',3),
  ('Implant Planning Solutions','BD Implant Scanbody Set','https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',4),
  ('Implant Planning Solutions','BD Guided Surgery Starter','https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',5)
)
insert into products (product_name, category, brand, model, short_description, full_description, key_features, specifications, image_url, status, featured)
select product_name, category, 'Betty Digital', 'BD-' || idx || '00',
       product_name || ' for reliable digital dental workflow.',
       product_name || ' supports modern labs with equipment guidance, workflow setup, international delivery, and after-sales support.',
       'Open workflow, international delivery, training support, after-sales service',
       '{"usage":"Dental lab and clinic","warranty":"1 Year","support":"Full after-sales support","delivery":"International","origin":"China"}'::jsonb,
       image_url, 'active', idx = 1
from product_seed
where not exists (select 1 from products where products.product_name = product_seed.product_name);

insert into services (service_title, service_description, icon, status)
values
('Digital Dental Workflow Setup','Plan a complete scan-design-mill-print workflow that fits your lab capacity and budget.','FaChartLine','active'),
('Dental Equipment Consultation','Compare scanners, mills, printers, furnaces, and materials with expert business guidance.','FaComments','active'),
('CAD/CAM System Integration','Connect equipment, software, and production protocols into one efficient daily workflow.','FaCubes','active'),
('Dental Lab Training','Train teams on scanning, CAD design, nesting, milling, printing, finishing, and QA.','FaUserMd','active'),
('Product Supply & Support','Reliable international sourcing for equipment, parts, materials, and digital accessories.','FaBoxOpen','active'),
('After-Sales Technical Assistance','Responsive remote support, setup guidance, and practical troubleshooting.','FaHeadset','active'),
('Custom Dental Case Solutions','Support complex implant, restoration, surgical guide, and aesthetic case workflows.','FaShieldAlt','active'),
('International Buyer Support','Clear communication, shipment coordination, and product selection for global buyers.','FaGlobe','active'),
('Dental Lab Business Planning','Plan equipment investment, production capacity, material needs, and daily workflow.','FaChartLine','active'),
('Remote Workflow Troubleshooting','Get structured remote help for scanning, design export, nesting, milling, printing, and finishing issues.','FaHeadset','active'),
('Material Selection Guidance','Choose zirconia, PMMA, wax, resin, and ceramic materials based on case type and machine compatibility.','FaFlask','active'),
('Complete Lab Package Setup','Build starter or upgrade packages with scanners, mills, printers, furnaces, and consumables.','FaTools','active')
on conflict do nothing;

insert into gallery (title, category, image_url)
values
('Digital Dental Scanner Setup','Equipment','https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80'),
('Modern CAD/CAM Lab','Lab Workflow','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80'),
('Dental 3D Printing Workflow','3D Printing','https://images.unsplash.com/photo-1633113088983-cc3fe37f37b5?auto=format&fit=crop&w=900&q=80'),
('Zirconia Milling Production','CAD/CAM','https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80'),
('Dental Lab Training Session','Training','https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80'),
('Complete Digital Lab Package','Equipment','https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80')
on conflict do nothing;

insert into blogs (title, slug, category, image_url, content, status)
values
('How to Choose a Dental Intraoral Scanner','choose-dental-intraoral-scanner','Buying Guide','https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80','A practical guide to accuracy, speed, support, software export, and daily clinical scanning workflow.','published'),
('CAD/CAM Workflow for Dental Labs','cad-cam-workflow-dental-labs','Workflow','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80','Modern dental laboratories need scan, design, nesting, milling, printing, finishing, and quality control processes.','published'),
('5-Axis Dental Milling Machine Buying Guide','dental-milling-machine-buying-guide','Dental CAD/CAM','https://images.unsplash.com/photo-1581092334247-27e8a9b9a9f7?auto=format&fit=crop&w=900&q=80','Understand spindle power, axis control, material compatibility, calibration, dust control, and after-sales support before buying a dental mill.','published'),
('Dental 3D Printing Applications for Labs','dental-3d-printing-applications','3D Printing','https://images.unsplash.com/photo-1633113089631-6456cccaadad?auto=format&fit=crop&w=900&q=80','Dental 3D printers support models, surgical guides, splints, custom trays, try-ins, casting patterns, and production planning.','published'),
('How to Select Zirconia Discs and Blocks','select-zirconia-discs-blocks','Materials','https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80','Choose zirconia by translucency, strength, shade system, restoration type, sintering requirements, and milling compatibility.','published'),
('Why After-Sales Support Matters in Digital Dentistry','after-sales-support-digital-dentistry','After-Sales Support','https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=900&q=80','Reliable support helps labs reduce downtime, solve workflow issues, train staff faster, and protect equipment investment.','published')
on conflict (slug) do update
set title = excluded.title,
    category = excluded.category,
    image_url = excluded.image_url,
    content = excluded.content,
    status = excluded.status;

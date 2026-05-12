insert into storage.buckets (id, name, public) values ('designs', 'designs', true) on conflict (id) do nothing;

create policy "Public read designs" on storage.objects for select using (bucket_id = 'designs');
create policy "Anyone can upload designs" on storage.objects for insert with check (bucket_id = 'designs');
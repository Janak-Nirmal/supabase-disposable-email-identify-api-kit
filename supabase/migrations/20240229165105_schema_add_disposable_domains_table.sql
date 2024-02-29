create table "public"."blocklist" (
    "id" uuid not null default gen_random_uuid(),
    "domain" text not null,
    "created_at" timestamp without time zone not null default (now() AT TIME ZONE 'utc'::text)
);

alter table "public"."blocklist" enable row level security;

CREATE UNIQUE INDEX blocklist_pkey ON public.blocklist USING btree (id);

alter table "public"."blocklist" add constraint "blocklist_pkey" PRIMARY KEY using index "blocklist_pkey";

grant delete on table "public"."blocklist" to "anon";

grant insert on table "public"."blocklist" to "anon";

grant references on table "public"."blocklist" to "anon";

grant select on table "public"."blocklist" to "anon";

grant trigger on table "public"."blocklist" to "anon";

grant truncate on table "public"."blocklist" to "anon";

grant update on table "public"."blocklist" to "anon";

grant delete on table "public"."blocklist" to "authenticated";

grant insert on table "public"."blocklist" to "authenticated";

grant references on table "public"."blocklist" to "authenticated";

grant select on table "public"."blocklist" to "authenticated";

grant trigger on table "public"."blocklist" to "authenticated";

grant truncate on table "public"."blocklist" to "authenticated";

grant update on table "public"."blocklist" to "authenticated";

grant delete on table "public"."blocklist" to "service_role";

grant insert on table "public"."blocklist" to "service_role";

grant references on table "public"."blocklist" to "service_role";

grant select on table "public"."blocklist" to "service_role";

grant trigger on table "public"."blocklist" to "service_role";

grant truncate on table "public"."blocklist" to "service_role";

grant update on table "public"."blocklist" to "service_role";
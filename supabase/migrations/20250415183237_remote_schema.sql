create type "public"."EstadoReserva" as enum ('PENDIENTE', 'CONFIRMADA', 'CANCELADA');

create type "public"."MetodoPago" as enum ('TARJETA', 'TRANSFERENCIA', 'EFECTIVO');

create table "public"."Account" (
    "id" text not null,
    "userId" text not null,
    "type" text not null,
    "provider" text not null,
    "providerAccountId" text not null,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text
);


create table "public"."Experiencia" (
    "id" text not null,
    "titulo" text not null,
    "subtitulo" text not null,
    "descripcion" text not null,
    "imagen" text not null,
    "disponibilidad" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."Favorito" (
    "id" text not null,
    "temploId" text not null,
    "userId" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP
);


alter table "public"."Favorito" enable row level security;

create table "public"."Reserva" (
    "id" text not null,
    "temploId" text not null,
    "userId" text not null,
    "fechaInicio" timestamp(3) without time zone not null,
    "fechaFin" timestamp(3) without time zone not null,
    "numeroHuespedes" integer not null,
    "precioTotal" numeric(10,2) not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null,
    "notas" text,
    "estado" "EstadoReserva" not null default 'PENDIENTE'::"EstadoReserva",
    "metodoPago" "MetodoPago" not null
);


alter table "public"."Reserva" enable row level security;

create table "public"."Session" (
    "id" text not null,
    "sessionToken" text not null,
    "userId" text not null,
    "expires" timestamp(3) without time zone not null
);


create table "public"."Templo" (
    "id" text not null,
    "nombre" text not null,
    "descripcion" text not null,
    "capacidad" integer not null,
    "precio" numeric(10,2) not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null,
    "amenities" text[],
    "descripcionCorta" text not null,
    "imagenPrincipal" text not null,
    "imagenes" text[],
    "slug" text not null,
    "camas" text[] not null,
    "destacado" boolean not null default false
);


alter table "public"."Templo" enable row level security;

create table "public"."User" (
    "id" text not null,
    "name" text,
    "email" text,
    "emailVerified" timestamp(3) without time zone,
    "image" text,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "isAdmin" boolean default false
);


alter table "public"."User" enable row level security;

create table "public"."VerificationToken" (
    "identifier" text not null,
    "token" text not null,
    "expires" timestamp(3) without time zone not null
);


create table "public"."_prisma_migrations" (
    "id" character varying(36) not null,
    "checksum" character varying(64) not null,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) not null,
    "logs" text,
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone not null default now(),
    "applied_steps_count" integer not null default 0
);


create table "public"."profiles" (
    "id" bigint generated always as identity not null,
    "user_id" uuid,
    "email" text,
    "is_admin" boolean default false,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone default now()
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX "Account_pkey" ON public."Account" USING btree (id);

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");

CREATE UNIQUE INDEX "Experiencia_pkey" ON public."Experiencia" USING btree (id);

CREATE UNIQUE INDEX "Favorito_pkey" ON public."Favorito" USING btree (id);

CREATE UNIQUE INDEX "Favorito_temploId_userId_key" ON public."Favorito" USING btree ("temploId", "userId");

CREATE UNIQUE INDEX "Reserva_pkey" ON public."Reserva" USING btree (id);

CREATE UNIQUE INDEX "Session_pkey" ON public."Session" USING btree (id);

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");

CREATE UNIQUE INDEX "Templo_pkey" ON public."Templo" USING btree (id);

CREATE UNIQUE INDEX "Templo_slug_key" ON public."Templo" USING btree (slug);

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (id);

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);

CREATE UNIQUE INDEX _prisma_migrations_pkey ON public._prisma_migrations USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);

alter table "public"."Account" add constraint "Account_pkey" PRIMARY KEY using index "Account_pkey";

alter table "public"."Experiencia" add constraint "Experiencia_pkey" PRIMARY KEY using index "Experiencia_pkey";

alter table "public"."Favorito" add constraint "Favorito_pkey" PRIMARY KEY using index "Favorito_pkey";

alter table "public"."Reserva" add constraint "Reserva_pkey" PRIMARY KEY using index "Reserva_pkey";

alter table "public"."Session" add constraint "Session_pkey" PRIMARY KEY using index "Session_pkey";

alter table "public"."Templo" add constraint "Templo_pkey" PRIMARY KEY using index "Templo_pkey";

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."_prisma_migrations" add constraint "_prisma_migrations_pkey" PRIMARY KEY using index "_prisma_migrations_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."Account" add constraint "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Account" validate constraint "Account_userId_fkey";

alter table "public"."Favorito" add constraint "Favorito_temploId_fkey" FOREIGN KEY ("temploId") REFERENCES "Templo"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Favorito" validate constraint "Favorito_temploId_fkey";

alter table "public"."Favorito" add constraint "Favorito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Favorito" validate constraint "Favorito_userId_fkey";

alter table "public"."Reserva" add constraint "Reserva_temploId_fkey" FOREIGN KEY ("temploId") REFERENCES "Templo"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Reserva" validate constraint "Reserva_temploId_fkey";

alter table "public"."Reserva" add constraint "Reserva_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Reserva" validate constraint "Reserva_userId_fkey";

alter table "public"."Session" add constraint "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Session" validate constraint "Session_userId_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_key" UNIQUE using index "profiles_user_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, created_at)
  VALUES (new.id, new.email, new.created_at);
  RETURN new;
END;
$function$
;

create policy "Admins can do all on Reservas"
on "public"."Reserva"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM "User"
  WHERE (("User".id = (auth.uid())::text) AND ("User"."isAdmin" = true)))));


create policy "Users can create reservas"
on "public"."Reserva"
as permissive
for insert
to authenticated
with check (("userId" = (auth.uid())::text));


create policy "Users can view their own reservas"
on "public"."Reserva"
as permissive
for select
to authenticated
using (("userId" = (auth.uid())::text));


create policy "Admins can do all on Templos"
on "public"."Templo"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM "User"
  WHERE (("User".id = (auth.uid())::text) AND ("User"."isAdmin" = true)))));


create policy "Enable read access for all users on Templo"
on "public"."Templo"
as permissive
for select
to public
using (true);


create policy "Admins can do all on Users"
on "public"."User"
as permissive
for all
to authenticated
using (("isAdmin" = true))
with check (("isAdmin" = true));


create policy "Allow insert during signup"
on "public"."User"
as permissive
for insert
to authenticated
with check (true);


create policy "Users can read own profile"
on "public"."User"
as permissive
for select
to authenticated
using (((auth.uid())::text = id));


create policy "Users can update own profile"
on "public"."User"
as permissive
for update
to authenticated
using (((auth.uid())::text = id));


create policy "Users can update their own data"
on "public"."User"
as permissive
for update
to authenticated
using ((id = (auth.uid())::text))
with check ((id = (auth.uid())::text));


create policy "Users can view and update their own data"
on "public"."User"
as permissive
for select
to authenticated
using ((id = (auth.uid())::text));


create policy "Admins can update all profiles"
on "public"."profiles"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM profiles profiles_1
  WHERE ((profiles_1.user_id = auth.uid()) AND (profiles_1.is_admin = true)))));


create policy "Admins can view all profiles"
on "public"."profiles"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM profiles profiles_1
  WHERE ((profiles_1.user_id = auth.uid()) AND (profiles_1.is_admin = true)))));


create policy "Users can update their own profile"
on "public"."profiles"
as permissive
for update
to public
using ((user_id = auth.uid()));


create policy "Users can view their own profile"
on "public"."profiles"
as permissive
for select
to public
using ((user_id = auth.uid()));




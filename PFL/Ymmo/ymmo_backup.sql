--
-- PostgreSQL database dump
--

\restrict 6qAyYBnOEdQMDTcJSnBOYoyYNW5h2ddmOuum3Xql2uGRNd76HLviM7TFHaYgFQO

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: PropertyStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PropertyStatus" AS ENUM (
    'AVAILABLE',
    'UNDER_OFFER',
    'SOLD'
);


ALTER TYPE public."PropertyStatus" OWNER TO postgres;

--
-- Name: PropertyType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PropertyType" AS ENUM (
    'APARTMENT',
    'HOUSE',
    'LAND',
    'COMMERCIAL'
);


ALTER TYPE public."PropertyType" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'CLIENT',
    'AGENT',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'COMPLETED'
);


ALTER TYPE public."TransactionStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Agent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Agent" (
    id text NOT NULL,
    "licenseNumber" text NOT NULL,
    "agencyName" text NOT NULL,
    bio text,
    "userId" text NOT NULL
);


ALTER TABLE public."Agent" OWNER TO postgres;

--
-- Name: Favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Favorite" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "propertyId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Favorite" OWNER TO postgres;

--
-- Name: Photo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Photo" (
    id text NOT NULL,
    url text NOT NULL,
    "propertyId" text NOT NULL
);


ALTER TABLE public."Photo" OWNER TO postgres;

--
-- Name: Property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Property" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    surface double precision NOT NULL,
    rooms integer NOT NULL,
    type public."PropertyType" NOT NULL,
    status public."PropertyStatus" DEFAULT 'AVAILABLE'::public."PropertyStatus" NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    "postalCode" text NOT NULL,
    latitude double precision,
    longitude double precision,
    "agentId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Property" OWNER TO postgres;

--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transaction" (
    id text NOT NULL,
    "buyerId" text NOT NULL,
    "propertyId" text NOT NULL,
    "offerPrice" double precision NOT NULL,
    status public."TransactionStatus" DEFAULT 'PENDING'::public."TransactionStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Transaction" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone text,
    role public."Role" DEFAULT 'CLIENT'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Agent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Agent" (id, "licenseNumber", "agencyName", bio, "userId") FROM stdin;
c5cb4e19-871a-4694-b95d-4b181d764852	LIC-001	Ymmo Agency	Agent immobilier expert	c5cb4e19-871a-4694-b95d-4b181d764852
3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	AG-2026-001	Ymmo Paris Lyon	Spécialiste des biens urbains haut de gamme à Paris et Lyon.	0aae1418-e2f8-4407-83b6-d70b8cd78c90
5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	AG-2026-002	Ymmo Méditerranée	Expert des maisons familiales et appartements avec caractère.	e224f9af-1cff-4a85-b1af-1544fc70e936
b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	AG-2026-003	Ymmo Ouest Nord	Accompagnement sur les biens familiaux et les résidences principales.	7da0436e-340c-4a03-9f6a-96e06d9ce48e
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Favorite" (id, "userId", "propertyId", "createdAt") FROM stdin;
31d60668-6598-42b1-96b8-0b9cdab86974	784e31e7-a426-4eea-8a7c-ff924c452f88	b5af511c-6f3b-4500-97db-f9c7fd2a720d	2026-06-11 09:19:30.315
e899be48-d9c2-4779-b12c-ab6a3de0fe3f	784e31e7-a426-4eea-8a7c-ff924c452f88	50a095a6-b59d-4c4a-8251-8acd0005cbbf	2026-06-11 09:19:30.315
d2e806bd-1d79-477c-8e45-1d5c11981270	784e31e7-a426-4eea-8a7c-ff924c452f88	48814057-f225-4869-8648-47e5fab504aa	2026-06-11 09:19:30.315
ad34ce41-9156-47d4-b3dd-37210e16ec69	784e31e7-a426-4eea-8a7c-ff924c452f88	3f3684b8-8f25-4ccb-ac29-aac97ae0e3ca	2026-06-11 09:19:30.315
680f6294-cd0c-4b26-9628-63289ade8b85	784e31e7-a426-4eea-8a7c-ff924c452f88	5475db59-4bf8-4696-8de5-de0e284a15e8	2026-06-11 09:19:30.315
e1ebdc9c-95d0-48ca-ab4a-fac79e447dc9	784e31e7-a426-4eea-8a7c-ff924c452f88	e9bd897f-906e-42fa-9f9d-75e8a5953155	2026-06-11 09:19:30.315
a9024e41-e56a-44fd-b0ff-b40c94a48fbd	32be4966-c456-438d-82b2-fd0a0aba5c6c	d729c94d-d671-42b3-8305-583bfe373446	2026-06-11 09:19:30.315
26b44030-8649-40d7-845f-2154d752f227	32be4966-c456-438d-82b2-fd0a0aba5c6c	b9e854a4-2b4a-40d6-886b-ce7f7b53a691	2026-06-11 09:19:30.315
64fde101-6ee4-4a83-a873-8dd90d697aeb	32be4966-c456-438d-82b2-fd0a0aba5c6c	a7f97ee3-3f7e-46fc-9c09-abb1c5bdc4f8	2026-06-11 09:19:30.315
d5643d1a-71fa-47bf-a7e5-e17bd0c7292d	32be4966-c456-438d-82b2-fd0a0aba5c6c	ab027303-9f72-408b-855d-9aef2125593d	2026-06-11 09:19:30.315
abd7e709-4f7d-4ba7-94ae-05b17ec81d38	32be4966-c456-438d-82b2-fd0a0aba5c6c	9a34ce25-c66e-41ad-8532-24e06339ea1e	2026-06-11 09:19:30.315
4cc8cd3c-bc58-4c40-9fe4-c1863dbfa3b5	32be4966-c456-438d-82b2-fd0a0aba5c6c	7c48d6e9-572c-4df0-8f3d-cca009c9f5af	2026-06-11 09:19:30.315
1d5a3856-2368-45c8-b4fb-c198fcccac9e	818449ce-137a-480d-9114-1b54a7858910	ddb8d3ec-c3b9-470f-b9ab-637a3ce275e0	2026-06-11 09:19:30.315
c79712ff-cde3-4068-bb88-a168de52fe5e	818449ce-137a-480d-9114-1b54a7858910	ddcb6416-812a-439b-a741-13ee83381c42	2026-06-11 09:19:30.315
4596443e-4d39-4521-b8fd-184a8e362301	818449ce-137a-480d-9114-1b54a7858910	3eb3ef34-37a4-41e5-a7c3-a6b8ed13bd50	2026-06-11 09:19:30.315
8f7f5a8c-882e-43fb-b958-be8051a1aeef	818449ce-137a-480d-9114-1b54a7858910	1273fc41-1c9a-49c5-97ea-ed9d1ec77547	2026-06-11 09:19:30.315
52610449-7745-449a-a34f-c1bd9d666fab	818449ce-137a-480d-9114-1b54a7858910	a7ed855a-3bb3-4c8f-8180-9aa1a3aa82c5	2026-06-11 09:19:30.315
250ca812-f750-45b7-8a89-17e8d0b27743	818449ce-137a-480d-9114-1b54a7858910	345633c1-7ddc-44e0-b569-3b06ec087495	2026-06-11 09:19:30.315
\.


--
-- Data for Name: Photo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Photo" (id, url, "propertyId") FROM stdin;
0db89434-f219-4ec7-9441-39bafd2c3073	https://picsum.photos/seed/paris-1-apartment-1/1200/800	b5af511c-6f3b-4500-97db-f9c7fd2a720d
79c7c5b1-c24f-4b85-83f9-f3dbf53e3f6a	https://picsum.photos/seed/paris-1-apartment-2/1200/800	b5af511c-6f3b-4500-97db-f9c7fd2a720d
dd6a778a-aa1e-43da-a531-af7ec11c9539	https://picsum.photos/seed/paris-1-apartment-3/1200/800	b5af511c-6f3b-4500-97db-f9c7fd2a720d
7cf90cd6-08d5-4d08-be8c-e939f1d28ceb	https://picsum.photos/seed/paris-2-apartment-1/1200/800	d729c94d-d671-42b3-8305-583bfe373446
5085f271-6485-427e-95ef-115520cdfca2	https://picsum.photos/seed/paris-2-apartment-2/1200/800	d729c94d-d671-42b3-8305-583bfe373446
76ae2f14-9078-4a86-a6f0-1a9c381959a0	https://picsum.photos/seed/paris-2-apartment-3/1200/800	d729c94d-d671-42b3-8305-583bfe373446
4177ee13-ed06-4ea2-93b2-0cac903ab762	https://picsum.photos/seed/paris-3-apartment-1/1200/800	ddb8d3ec-c3b9-470f-b9ab-637a3ce275e0
d0b72499-9cb8-4a1b-be8f-7d78a335964f	https://picsum.photos/seed/paris-3-apartment-2/1200/800	ddb8d3ec-c3b9-470f-b9ab-637a3ce275e0
c17f9033-97c8-4ccf-9d0e-069f9202557b	https://picsum.photos/seed/paris-3-apartment-3/1200/800	ddb8d3ec-c3b9-470f-b9ab-637a3ce275e0
3539575d-e66c-4425-a1ce-cac5b7607076	https://picsum.photos/seed/paris-4-house-1/1200/800	17b3de8b-84e0-4779-ae9f-22334e2d096a
c9aa857c-177d-4e54-84d3-d54f51d8109e	https://picsum.photos/seed/paris-4-house-2/1200/800	17b3de8b-84e0-4779-ae9f-22334e2d096a
0f46840e-1339-4c91-9374-67eb7774fa32	https://picsum.photos/seed/paris-4-house-3/1200/800	17b3de8b-84e0-4779-ae9f-22334e2d096a
e69516b4-746e-4892-bd14-37a1c4f4d2fa	https://picsum.photos/seed/paris-5-apartment-1/1200/800	e8177f42-98d8-4513-9bcf-7cadc7235b28
2436444c-a27e-4d8b-b4fa-57e9ecd29620	https://picsum.photos/seed/paris-5-apartment-2/1200/800	e8177f42-98d8-4513-9bcf-7cadc7235b28
9c169e5e-0af5-4cec-a884-cfa3f0c032ee	https://picsum.photos/seed/paris-5-apartment-3/1200/800	e8177f42-98d8-4513-9bcf-7cadc7235b28
7976baec-efcc-4a9c-89db-047f3f83fb35	https://picsum.photos/seed/lyon-1-apartment-1/1200/800	50a095a6-b59d-4c4a-8251-8acd0005cbbf
ca925a39-200e-44e3-b94a-dc1a69ce4f22	https://picsum.photos/seed/lyon-1-apartment-2/1200/800	50a095a6-b59d-4c4a-8251-8acd0005cbbf
26c540c3-0ca5-4b4d-83b4-edc36303a809	https://picsum.photos/seed/lyon-1-apartment-3/1200/800	50a095a6-b59d-4c4a-8251-8acd0005cbbf
545ff844-24da-408b-bb47-b79bebba717c	https://picsum.photos/seed/lyon-2-apartment-1/1200/800	b9e854a4-2b4a-40d6-886b-ce7f7b53a691
51a5250c-1aef-40ba-b47e-1add3444fe16	https://picsum.photos/seed/lyon-2-apartment-2/1200/800	b9e854a4-2b4a-40d6-886b-ce7f7b53a691
45e4e9dc-106d-4ad0-9afe-91a6aedd03f1	https://picsum.photos/seed/lyon-2-apartment-3/1200/800	b9e854a4-2b4a-40d6-886b-ce7f7b53a691
8c4e8e76-bb42-4e83-92a6-cab02d94fe1d	https://picsum.photos/seed/lyon-3-house-1/1200/800	68e043bf-9f18-4233-a2aa-c8600b19f261
8510de02-be00-43cb-a925-b3338a5b5bc5	https://picsum.photos/seed/lyon-3-house-2/1200/800	68e043bf-9f18-4233-a2aa-c8600b19f261
64072987-2f4c-4d5a-89b3-20bd0d1fcfb9	https://picsum.photos/seed/lyon-3-house-3/1200/800	68e043bf-9f18-4233-a2aa-c8600b19f261
d329d122-43ba-4cda-995f-d509a2a9ade2	https://picsum.photos/seed/lyon-4-apartment-1/1200/800	ddcb6416-812a-439b-a741-13ee83381c42
a4ae3d74-d7e5-4164-9c9d-e2ab3afdcd2f	https://picsum.photos/seed/lyon-4-apartment-2/1200/800	ddcb6416-812a-439b-a741-13ee83381c42
bccef018-5805-4fc1-9f59-6c8b27f61ea6	https://picsum.photos/seed/lyon-4-apartment-3/1200/800	ddcb6416-812a-439b-a741-13ee83381c42
556ddf9c-a385-4e3a-8b7b-ad8835faa05e	https://picsum.photos/seed/lyon-5-apartment-1/1200/800	d841944e-faa5-4b8f-aaad-840da8a4e6ec
c33e9393-3868-4aac-a439-17ec0b4072a9	https://picsum.photos/seed/lyon-5-apartment-2/1200/800	d841944e-faa5-4b8f-aaad-840da8a4e6ec
cbbda7aa-c65d-4eef-955b-d3dae61ae427	https://picsum.photos/seed/lyon-5-apartment-3/1200/800	d841944e-faa5-4b8f-aaad-840da8a4e6ec
1c298358-1208-498b-9aca-eaaaf1517053	https://picsum.photos/seed/marseille-1-apartment-1/1200/800	48814057-f225-4869-8648-47e5fab504aa
f707e3c3-5fec-4820-ba62-6b88d8d5bac5	https://picsum.photos/seed/marseille-1-apartment-2/1200/800	48814057-f225-4869-8648-47e5fab504aa
36ca1dc0-f715-461a-b2c7-ef9f078c7a50	https://picsum.photos/seed/marseille-1-apartment-3/1200/800	48814057-f225-4869-8648-47e5fab504aa
650a830b-7a77-455c-a769-700587f0342a	https://picsum.photos/seed/marseille-2-house-1/1200/800	84258d47-f62f-4641-9216-4a321ca8b47f
bc0dd13b-2e9a-4ede-a1c7-0eb021b9d779	https://picsum.photos/seed/marseille-2-house-2/1200/800	84258d47-f62f-4641-9216-4a321ca8b47f
3ff75db8-14ca-4933-9fe7-35b5dd14d951	https://picsum.photos/seed/marseille-2-house-3/1200/800	84258d47-f62f-4641-9216-4a321ca8b47f
ef88a25d-16b5-4aae-bd24-160039381b3b	https://picsum.photos/seed/marseille-3-apartment-1/1200/800	3eb3ef34-37a4-41e5-a7c3-a6b8ed13bd50
e91c25b4-c071-443c-a53a-ebaa16fa1239	https://picsum.photos/seed/marseille-3-apartment-2/1200/800	3eb3ef34-37a4-41e5-a7c3-a6b8ed13bd50
bdb09b0a-5095-4653-9f9c-36eda622b659	https://picsum.photos/seed/marseille-3-apartment-3/1200/800	3eb3ef34-37a4-41e5-a7c3-a6b8ed13bd50
15fb6f61-ff4e-48cd-b326-46a32efbcbcf	https://picsum.photos/seed/marseille-4-house-1/1200/800	a7f97ee3-3f7e-46fc-9c09-abb1c5bdc4f8
2f879a78-7267-4a3a-b721-e8a319db33cb	https://picsum.photos/seed/marseille-4-house-2/1200/800	a7f97ee3-3f7e-46fc-9c09-abb1c5bdc4f8
1166da93-37b3-44fe-8cf0-26b8d916b462	https://picsum.photos/seed/marseille-4-house-3/1200/800	a7f97ee3-3f7e-46fc-9c09-abb1c5bdc4f8
fe280ed6-d5be-4c96-b2d7-09b3eb390639	https://picsum.photos/seed/marseille-5-apartment-1/1200/800	e57a7a71-be06-4a26-a2b2-dd2bc723b9be
91167e5e-852f-469e-88c8-c68963172c4d	https://picsum.photos/seed/marseille-5-apartment-2/1200/800	e57a7a71-be06-4a26-a2b2-dd2bc723b9be
2c493e36-0321-4ef8-a3db-d47125c256a9	https://picsum.photos/seed/marseille-5-apartment-3/1200/800	e57a7a71-be06-4a26-a2b2-dd2bc723b9be
1f5ba046-5341-4709-97f7-4ca694776c24	https://picsum.photos/seed/bordeaux-1-apartment-1/1200/800	3f3684b8-8f25-4ccb-ac29-aac97ae0e3ca
0827c10d-7740-4cec-9bde-8a93fe88a77d	https://picsum.photos/seed/bordeaux-1-apartment-2/1200/800	3f3684b8-8f25-4ccb-ac29-aac97ae0e3ca
ccc932f4-3594-4381-a8ee-d5afad46df13	https://picsum.photos/seed/bordeaux-1-apartment-3/1200/800	3f3684b8-8f25-4ccb-ac29-aac97ae0e3ca
c7fca6c6-e558-44f3-b8f4-4fe564c7e25a	https://picsum.photos/seed/bordeaux-2-house-1/1200/800	ab027303-9f72-408b-855d-9aef2125593d
111a1a15-2f3a-4442-9482-4d766cb10e78	https://picsum.photos/seed/bordeaux-2-house-2/1200/800	ab027303-9f72-408b-855d-9aef2125593d
ea10b993-17a8-44d1-a53b-655932d0361a	https://picsum.photos/seed/bordeaux-2-house-3/1200/800	ab027303-9f72-408b-855d-9aef2125593d
17489bc7-54f3-4fa3-8949-db78edcb12d0	https://picsum.photos/seed/bordeaux-3-apartment-1/1200/800	f52f2aa5-670d-4199-a829-18b452c51d23
e0e34bfe-06a5-4b59-9132-c9acfa5c6def	https://picsum.photos/seed/bordeaux-3-apartment-2/1200/800	f52f2aa5-670d-4199-a829-18b452c51d23
4688440e-cc72-42bf-9a67-e5653a00c5d3	https://picsum.photos/seed/bordeaux-3-apartment-3/1200/800	f52f2aa5-670d-4199-a829-18b452c51d23
84230c71-d516-4d93-9ee0-e9484bba6b8b	https://picsum.photos/seed/bordeaux-4-apartment-1/1200/800	1273fc41-1c9a-49c5-97ea-ed9d1ec77547
f23dafea-adf3-482e-a7a1-1ee8ba47ec6a	https://picsum.photos/seed/bordeaux-4-apartment-2/1200/800	1273fc41-1c9a-49c5-97ea-ed9d1ec77547
ebcb9942-2f81-472c-b8ed-b7ba82eb53e1	https://picsum.photos/seed/bordeaux-4-apartment-3/1200/800	1273fc41-1c9a-49c5-97ea-ed9d1ec77547
2bed88fc-9aef-4bfb-9a8d-5e737ad1c1f0	https://picsum.photos/seed/bordeaux-5-house-1/1200/800	0a7fd95c-c2c3-4300-bdfe-65c8b4204552
4ab6be9e-6641-4087-9970-c6692342ee24	https://picsum.photos/seed/bordeaux-5-house-2/1200/800	0a7fd95c-c2c3-4300-bdfe-65c8b4204552
1b248992-4d62-4cef-af71-ba1054546cd0	https://picsum.photos/seed/bordeaux-5-house-3/1200/800	0a7fd95c-c2c3-4300-bdfe-65c8b4204552
d4eddd4e-ebb8-4089-a6ed-1496abab53ee	https://picsum.photos/seed/nantes-1-apartment-1/1200/800	5475db59-4bf8-4696-8de5-de0e284a15e8
951e444b-259b-4fbf-8a33-56ae946d6dc2	https://picsum.photos/seed/nantes-1-apartment-2/1200/800	5475db59-4bf8-4696-8de5-de0e284a15e8
b39e0cfe-e71e-47af-a9dd-30c5cb39c608	https://picsum.photos/seed/nantes-1-apartment-3/1200/800	5475db59-4bf8-4696-8de5-de0e284a15e8
d59a7c7e-2328-456b-a9dd-90984c13a1e1	https://picsum.photos/seed/nantes-2-house-1/1200/800	9a34ce25-c66e-41ad-8532-24e06339ea1e
14ec4877-f2fc-4da3-911b-8d0d581dc9fd	https://picsum.photos/seed/nantes-2-house-2/1200/800	9a34ce25-c66e-41ad-8532-24e06339ea1e
1811bb59-ab48-4ecf-99d9-57dbba4d7398	https://picsum.photos/seed/nantes-2-house-3/1200/800	9a34ce25-c66e-41ad-8532-24e06339ea1e
62d8073e-f49f-4b4c-92a7-b1dfea784b78	https://picsum.photos/seed/nantes-3-apartment-1/1200/800	88207751-29fa-4ae6-8036-1920fccc6c14
ec35445a-a35e-4425-8dd1-1923cafc0a7d	https://picsum.photos/seed/nantes-3-apartment-2/1200/800	88207751-29fa-4ae6-8036-1920fccc6c14
b20c0374-09a1-4c8d-9768-6bd45ac2d38e	https://picsum.photos/seed/nantes-3-apartment-3/1200/800	88207751-29fa-4ae6-8036-1920fccc6c14
ad6874b4-6943-4bb2-af35-1be2a62fd4ec	https://picsum.photos/seed/nantes-4-apartment-1/1200/800	a7ed855a-3bb3-4c8f-8180-9aa1a3aa82c5
51296e1e-1eeb-491c-a871-1d6f8cb0a68d	https://picsum.photos/seed/nantes-4-apartment-2/1200/800	a7ed855a-3bb3-4c8f-8180-9aa1a3aa82c5
7cd45f24-b5a4-4983-af0e-75f4d9bedcce	https://picsum.photos/seed/nantes-4-apartment-3/1200/800	a7ed855a-3bb3-4c8f-8180-9aa1a3aa82c5
d6320a75-2c14-4dd1-bab1-d9157c4196c7	https://picsum.photos/seed/nantes-5-house-1/1200/800	d031aa22-2204-4549-8ad6-5a1b777fb387
fc9d8677-cd80-40da-a65b-fadf01f8125f	https://picsum.photos/seed/nantes-5-house-2/1200/800	d031aa22-2204-4549-8ad6-5a1b777fb387
c8a5d5c9-0299-44e3-859a-6bd8afdc0d32	https://picsum.photos/seed/nantes-5-house-3/1200/800	d031aa22-2204-4549-8ad6-5a1b777fb387
d7bcf757-755d-40be-98bd-a760d40971bd	https://picsum.photos/seed/lille-1-apartment-1/1200/800	e9bd897f-906e-42fa-9f9d-75e8a5953155
1fabd382-a36e-43c3-bbef-061ea3baa033	https://picsum.photos/seed/lille-1-apartment-2/1200/800	e9bd897f-906e-42fa-9f9d-75e8a5953155
ca8b229f-4b71-4484-9bcf-f2bbb0797d04	https://picsum.photos/seed/lille-1-apartment-3/1200/800	e9bd897f-906e-42fa-9f9d-75e8a5953155
fb3646fb-3721-4d98-b039-ab0902702094	https://picsum.photos/seed/lille-2-house-1/1200/800	345633c1-7ddc-44e0-b569-3b06ec087495
e7af482b-86ba-4056-87e1-022207803918	https://picsum.photos/seed/lille-2-house-2/1200/800	345633c1-7ddc-44e0-b569-3b06ec087495
6fc98497-4ce5-46a4-824d-8038e91f489d	https://picsum.photos/seed/lille-2-house-3/1200/800	345633c1-7ddc-44e0-b569-3b06ec087495
87cb0f6f-0c59-4113-a442-bd24781bea17	/properties/lille/vente-maison-lille___main_1920_1080.webp	98d06800-5158-4652-9875-f65e2bf456db
66f8e376-c503-4300-89b1-811720362778	/properties/lille/vente-maison-lille___main_1924_1080.webp	98d06800-5158-4652-9875-f65e2bf456db
dbc80b5b-3ff0-4269-accc-4ea4ad94dc58	/properties/lille/vente-maison-lille___main_385_216.webp	98d06800-5158-4652-9875-f65e2bf456db
b05e70a0-acc4-4699-8945-2784bbca04da	/properties/lille/vente-maison-lille___main_385_217.webp	98d06800-5158-4652-9875-f65e2bf456db
ba7220e4-c433-40f0-9784-541a61c75096	/properties/lille/vente-maison-lille___main_385_218.webp	98d06800-5158-4652-9875-f65e2bf456db
654457dd-10c6-42b8-acba-551c95d2c751	/properties/lille/vente-maison-lille___main_787_442.webp	98d06800-5158-4652-9875-f65e2bf456db
150703d2-8474-40c1-a778-67010efbf85b	/properties/lille/vauban/640695008.jpg	7c48d6e9-572c-4df0-8f3d-cca009c9f5af
88c0812f-02ca-4109-9781-c23eb9849ed6	/properties/lille/vauban/640695051.jpg	7c48d6e9-572c-4df0-8f3d-cca009c9f5af
d2cec585-a35b-4dff-af35-90568dca2968	/properties/lille/vauban/640695086.jpg	7c48d6e9-572c-4df0-8f3d-cca009c9f5af
285c2f98-8fea-42b1-8736-b53c0c9c33a2	/properties/lille/vauban/Vauban-2-700x400.jpg	7c48d6e9-572c-4df0-8f3d-cca009c9f5af
f5817ecc-58d5-40ff-84a7-226959c8aaaf	/properties/lille/vauban/640695008.jpg	56b7b1d3-d3de-4cfa-be6f-7771af8e350e
385d8050-7788-409e-8f1f-0ead355a7ac7	/properties/lille/vauban/640695051.jpg	56b7b1d3-d3de-4cfa-be6f-7771af8e350e
2939402b-df22-47b9-8d95-b9d18943b2be	/properties/lille/vauban/640695086.jpg	56b7b1d3-d3de-4cfa-be6f-7771af8e350e
07af3e69-3afa-47be-aa96-8c8cd7c48b8e	/properties/lille/vauban/Vauban-2-700x400.jpg	56b7b1d3-d3de-4cfa-be6f-7771af8e350e
\.


--
-- Data for Name: Property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Property" (id, title, description, price, surface, rooms, type, status, address, city, "postalCode", latitude, longitude, "agentId", "createdAt", "updatedAt") FROM stdin;
31c5d987-2c10-4257-a118-b8dff26a1aee	Bel appartement au centre de Paris	Magnifique appartement lumineux avec vue sur la Seine	450000	75	3	APARTMENT	AVAILABLE	12 Rue de Rivoli	Paris	75001	48.8566	2.3522	c5cb4e19-871a-4694-b95d-4b181d764852	2026-05-25 07:39:13.357	2026-05-25 07:39:13.357
b5af511c-6f3b-4500-97db-f9c7fd2a720d	Haussmannien avec balcon filant	Appartement de 82 m², 4 pièce(s), situé à Triangle d’or à Paris. Idéal pour une vie confortable et lumineuse.	945000	82	4	APARTMENT	AVAILABLE	18 avenue Montaigne	Paris	75008	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.201	2026-06-11 09:19:30.201
d729c94d-d671-42b3-8305-583bfe373446	Loft lumineux proche Bastille	Appartement de 96 m², 3 pièce(s), situé à Triangle d’or à Paris. Idéal pour une vie confortable et lumineuse.	1120000	96	3	APARTMENT	UNDER_OFFER	24 rue de la Roquette	Paris	75008	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.211	2026-06-11 09:19:30.211
ddb8d3ec-c3b9-470f-b9ab-637a3ce275e0	Duplex familial au Luxembourg	Appartement de 118 m², 5 pièce(s), situé à Triangle d’or à Paris. Idéal pour une vie confortable et lumineuse.	1390000	118	5	APARTMENT	AVAILABLE	11 rue Vavin	Paris	75008	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.215	2026-06-11 09:19:30.215
17b3de8b-84e0-4779-ae9f-22334e2d096a	Maison de ville aux Batignolles	Maison de 145 m², 6 pièce(s), situé à Triangle d’or à Paris. Idéal pour une vie confortable et lumineuse.	1680000	145	6	HOUSE	SOLD	9 rue des Moines	Paris	75008	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.22	2026-06-11 09:19:30.22
e8177f42-98d8-4513-9bcf-7cadc7235b28	Studio premium à Montmartre	Appartement de 31 m², 1 pièce(s), situé à Triangle d’or à Paris. Idéal pour une vie confortable et lumineuse.	329000	31	1	APARTMENT	AVAILABLE	6 rue Lepic	Paris	75008	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.224	2026-06-11 09:19:30.224
50a095a6-b59d-4c4a-8251-8acd0005cbbf	T3 vue Saône	Appartement de 74 m², 3 pièce(s), situé à Presqu’île à Lyon. Idéal pour une vie confortable et lumineuse.	485000	74	3	APARTMENT	AVAILABLE	7 rue de la République	Lyon	69002	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.227	2026-06-11 09:19:30.227
b9e854a4-2b4a-40d6-886b-ce7f7b53a691	Canut rénové à Croix-Rousse	Appartement de 91 m², 4 pièce(s), situé à Presqu’île à Lyon. Idéal pour une vie confortable et lumineuse.	675000	91	4	APARTMENT	UNDER_OFFER	15 montée de la Grande-Côte	Lyon	69002	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.231	2026-06-11 09:19:30.231
68e043bf-9f18-4233-a2aa-c8600b19f261	Maison familiale à Tassin	Maison de 132 m², 5 pièce(s), situé à Presqu’île à Lyon. Idéal pour une vie confortable et lumineuse.	795000	132	5	HOUSE	AVAILABLE	3 chemin des Fossés	Lyon	69002	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.235	2026-06-11 09:19:30.235
ddcb6416-812a-439b-a741-13ee83381c42	Duplex moderne à Confluence	Appartement de 88 m², 4 pièce(s), situé à Presqu’île à Lyon. Idéal pour une vie confortable et lumineuse.	558000	88	4	APARTMENT	AVAILABLE	21 quai Rambaud	Lyon	69002	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.238	2026-06-11 09:19:30.238
d841944e-faa5-4b8f-aaad-840da8a4e6ec	Appartement contemporain Part-Dieu	Appartement de 57 m², 2 pièce(s), situé à Presqu’île à Lyon. Idéal pour une vie confortable et lumineuse.	349000	57	2	APARTMENT	SOLD	48 cours Lafayette	Lyon	69002	\N	\N	3279a0fc-2cea-4d0f-a08d-7b70d80ac0a7	2026-06-11 09:19:30.243	2026-06-11 09:19:30.243
48814057-f225-4869-8648-47e5fab504aa	Appartement vue mer	Appartement de 85 m², 3 pièce(s), situé à Vieux-Port à Marseille. Idéal pour une vie confortable et lumineuse.	599000	85	3	APARTMENT	AVAILABLE	12 quai de Rive Neuve	Marseille	13001	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.248	2026-06-11 09:19:30.248
84258d47-f62f-4641-9216-4a321ca8b47f	Bastide provençale en ville	Maison de 162 m², 6 pièce(s), situé à Vieux-Port à Marseille. Idéal pour une vie confortable et lumineuse.	985000	162	6	HOUSE	AVAILABLE	6 boulevard de la Corderie	Marseille	13001	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.252	2026-06-11 09:19:30.252
3eb3ef34-37a4-41e5-a7c3-a6b8ed13bd50	T4 lumineux à Endoume	Appartement de 78 m², 4 pièce(s), situé à Vieux-Port à Marseille. Idéal pour une vie confortable et lumineuse.	435000	78	4	APARTMENT	UNDER_OFFER	22 rue d’Endoume	Marseille	13001	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.255	2026-06-11 09:19:30.255
a7f97ee3-3f7e-46fc-9c09-abb1c5bdc4f8	Maison avec jardin à Mazargues	Maison de 141 m², 5 pièce(s), situé à Vieux-Port à Marseille. Idéal pour une vie confortable et lumineuse.	725000	141	5	HOUSE	AVAILABLE	8 avenue de Mazargues	Marseille	13001	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.258	2026-06-11 09:19:30.258
e57a7a71-be06-4a26-a2b2-dd2bc723b9be	Duplex rooftop à la Joliette	Appartement de 103 m², 4 pièce(s), situé à Vieux-Port à Marseille. Idéal pour une vie confortable et lumineuse.	685000	103	4	APARTMENT	SOLD	14 rue du Panier	Marseille	13001	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.262	2026-06-11 09:19:30.262
3f3684b8-8f25-4ccb-ac29-aac97ae0e3ca	Appartement pierre bordelaise	Appartement de 76 m², 3 pièce(s), situé à Chartrons à Bordeaux. Idéal pour une vie confortable et lumineuse.	529000	76	3	APARTMENT	AVAILABLE	17 cours Portal	Bordeaux	33000	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.265	2026-06-11 09:19:30.265
ab027303-9f72-408b-855d-9aef2125593d	Échoppe rénovée à Caudéran	Maison de 118 m², 5 pièce(s), situé à Chartrons à Bordeaux. Idéal pour une vie confortable et lumineuse.	658000	118	5	HOUSE	AVAILABLE	34 avenue d’Arès	Bordeaux	33000	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.269	2026-06-11 09:19:30.269
f52f2aa5-670d-4199-a829-18b452c51d23	Loft rénové à Saint-Michel	Appartement de 92 m², 4 pièce(s), situé à Chartrons à Bordeaux. Idéal pour une vie confortable et lumineuse.	614000	92	4	APARTMENT	UNDER_OFFER	9 rue Leyteire	Bordeaux	33000	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.274	2026-06-11 09:19:30.274
1273fc41-1c9a-49c5-97ea-ed9d1ec77547	T2 balcon à Bacalan	Appartement de 49 m², 2 pièce(s), situé à Chartrons à Bordeaux. Idéal pour une vie confortable et lumineuse.	279000	49	2	APARTMENT	AVAILABLE	4 rue Achard	Bordeaux	33000	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.277	2026-06-11 09:19:30.277
0a7fd95c-c2c3-4300-bdfe-65c8b4204552	Maison familiale Saint-Augustin	Maison de 155 m², 6 pièce(s), situé à Chartrons à Bordeaux. Idéal pour une vie confortable et lumineuse.	845000	155	6	HOUSE	SOLD	21 rue de Bègles	Bordeaux	33000	\N	\N	5a8aa937-ba92-4d2c-b9fe-6c35c03bedfb	2026-06-11 09:19:30.28	2026-06-11 09:19:30.28
5475db59-4bf8-4696-8de5-de0e284a15e8	Appartement lumineux sur l’île	Appartement de 68 m², 3 pièce(s), situé à Île de Nantes à Nantes. Idéal pour une vie confortable et lumineuse.	389000	68	3	APARTMENT	AVAILABLE	5 rue des Machines	Nantes	44000	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.282	2026-06-11 09:19:30.282
9a34ce25-c66e-41ad-8532-24e06339ea1e	Maison nantaise à Procé	Maison de 132 m², 5 pièce(s), situé à Île de Nantes à Nantes. Idéal pour une vie confortable et lumineuse.	598000	132	5	HOUSE	AVAILABLE	18 boulevard de Longchamp	Nantes	44000	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.285	2026-06-11 09:19:30.285
88207751-29fa-4ae6-8036-1920fccc6c14	Duplex terrasse à Canclaux	Appartement de 97 m², 4 pièce(s), situé à Île de Nantes à Nantes. Idéal pour une vie confortable et lumineuse.	545000	97	4	APARTMENT	UNDER_OFFER	10 rue des Dervallières	Nantes	44000	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.289	2026-06-11 09:19:30.289
a7ed855a-3bb3-4c8f-8180-9aa1a3aa82c5	T4 centre-ville au Bouffay	Appartement de 84 m², 4 pièce(s), situé à Île de Nantes à Nantes. Idéal pour une vie confortable et lumineuse.	469000	84	4	APARTMENT	AVAILABLE	12 rue de la Juiverie	Nantes	44000	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.292	2026-06-11 09:19:30.292
d031aa22-2204-4549-8ad6-5a1b777fb387	Maison de caractère à Zola	Maison de 176 m², 7 pièce(s), situé à Île de Nantes à Nantes. Idéal pour une vie confortable et lumineuse.	915000	176	7	HOUSE	SOLD	3 rue des Roches	Nantes	44000	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.296	2026-06-11 09:19:30.296
e9bd897f-906e-42fa-9f9d-75e8a5953155	Appartement cossu Vieux-Lille	Appartement de 71 m², 3 pièce(s), situé à Vieux-Lille à Lille. Idéal pour une vie confortable et lumineuse.	319000	71	3	APARTMENT	AVAILABLE	8 rue de la Monnaie	Lille	59800	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.299	2026-06-11 09:19:30.299
345633c1-7ddc-44e0-b569-3b06ec087495	Maison de famille à Wazemmes	Maison de 124 m², 5 pièce(s), situé à Vieux-Lille à Lille. Idéal pour une vie confortable et lumineuse.	448000	124	5	HOUSE	AVAILABLE	27 rue Gambetta	Lille	59800	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.303	2026-06-11 09:19:30.303
56b7b1d3-d3de-4cfa-be6f-7771af8e350e	Loft industriel à Euralille	Appartement de 101 m², 4 pièce(s), situé à Vieux-Lille à Lille. Idéal pour une vie confortable et lumineuse.	535000	101	4	APARTMENT	UNDER_OFFER	19 boulevard de Turin	Lille	59800	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.306	2026-06-11 09:19:30.306
98d06800-5158-4652-9875-f65e2bf456db	Maison coup de c?ur ? LILLE Vauban ? Cormontaigne	Maison de 149 m?, 6 pi?ce(s), situ?e ? Vauban ? Cormontaigne ? Lille. Id?ale pour une vie confortable et lumineuse.	575000	149	6	HOUSE	AVAILABLE	Lille	Lille	59000	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.312	2026-06-11 09:31:55.573
7c48d6e9-572c-4df0-8f3d-cca009c9f5af	Duplex chaleureux ? Vauban	Appartement de 88 m?, 4 pi?ce(s), situ? ? Vauban ? Lille. Id?al pour une vie confortable et lumineuse.	379000	88	4	APARTMENT	AVAILABLE	14 avenue du Peuple Belge	Lille	59000	\N	\N	b57e8263-dc36-4f89-9fe4-cf782c2ee1ee	2026-06-11 09:19:30.309	2026-06-11 09:41:39.616
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transaction" (id, "buyerId", "propertyId", "offerPrice", status, "createdAt", "updatedAt") FROM stdin;
0e6d9a67-f530-4d21-96d3-3995e44269b9	8aa289c6-65c3-4964-8e94-5062416f7c39	31c5d987-2c10-4257-a118-b8dff26a1aee	430000	ACCEPTED	2026-05-25 08:01:34.93	2026-05-25 08:10:46.957
b111b3f3-dc26-4c78-bb89-400924fbdaf7	784e31e7-a426-4eea-8a7c-ff924c452f88	b5af511c-6f3b-4500-97db-f9c7fd2a720d	928000	PENDING	2026-06-11 09:19:30.324	2026-06-11 09:19:30.324
ff30eb9e-c91f-4735-88b1-7bb5d4d9a04d	784e31e7-a426-4eea-8a7c-ff924c452f88	48814057-f225-4869-8648-47e5fab504aa	612000	ACCEPTED	2026-06-11 09:19:30.327	2026-06-11 09:19:30.327
c5b98762-9e14-4e9a-83b9-38caef8ae937	32be4966-c456-438d-82b2-fd0a0aba5c6c	a7f97ee3-3f7e-46fc-9c09-abb1c5bdc4f8	710000	REJECTED	2026-06-11 09:19:30.328	2026-06-11 09:19:30.328
88d90dff-b4cb-4a92-b2a9-178525492f3d	32be4966-c456-438d-82b2-fd0a0aba5c6c	68e043bf-9f18-4233-a2aa-c8600b19f261	780000	PENDING	2026-06-11 09:19:30.33	2026-06-11 09:19:30.33
f55d6561-db42-4d88-b3c6-20cae5e85483	818449ce-137a-480d-9114-1b54a7858910	3f3684b8-8f25-4ccb-ac29-aac97ae0e3ca	519000	COMPLETED	2026-06-11 09:19:30.331	2026-06-11 09:19:30.331
d0bb85a4-933b-432e-bc8a-17fd65f4667e	818449ce-137a-480d-9114-1b54a7858910	9a34ce25-c66e-41ad-8532-24e06339ea1e	590000	PENDING	2026-06-11 09:19:30.332	2026-06-11 09:19:30.332
cec3764c-5dcf-4d28-81f7-14776adfa6e5	784e31e7-a426-4eea-8a7c-ff924c452f88	ddb8d3ec-c3b9-470f-b9ab-637a3ce275e0	1375000	PENDING	2026-06-11 09:19:30.333	2026-06-11 09:19:30.333
92a89e3b-51b6-4820-886c-edd7b0290e06	32be4966-c456-438d-82b2-fd0a0aba5c6c	b9e854a4-2b4a-40d6-886b-ce7f7b53a691	668000	ACCEPTED	2026-06-11 09:19:30.334	2026-06-11 09:19:30.334
bbf82ae2-cf86-450d-ac23-5c1cf669e05d	818449ce-137a-480d-9114-1b54a7858910	e9bd897f-906e-42fa-9f9d-75e8a5953155	313000	PENDING	2026-06-11 09:19:30.335	2026-06-11 09:19:30.335
3d12c975-c6c5-4171-a130-cb02a2c18945	784e31e7-a426-4eea-8a7c-ff924c452f88	88207751-29fa-4ae6-8036-1920fccc6c14	538000	REJECTED	2026-06-11 09:19:30.336	2026-06-11 09:19:30.336
34a7b261-c937-4f65-a5ee-6e6913c863ec	32be4966-c456-438d-82b2-fd0a0aba5c6c	56b7b1d3-d3de-4cfa-be6f-7771af8e350e	530000	PENDING	2026-06-11 09:19:30.338	2026-06-11 09:19:30.338
1c59ae38-86ea-405a-adda-b915b7d4ebb8	818449ce-137a-480d-9114-1b54a7858910	3eb3ef34-37a4-41e5-a7c3-a6b8ed13bd50	430000	PENDING	2026-06-11 09:19:30.339	2026-06-11 09:19:30.339
e4d18f58-476c-4299-a790-40ea6a42ef4f	784e31e7-a426-4eea-8a7c-ff924c452f88	5475db59-4bf8-4696-8de5-de0e284a15e8	382000	ACCEPTED	2026-06-11 09:19:30.34	2026-06-11 09:19:30.34
7e9bf2ba-c11b-4ebd-9a7f-b0aafd325ce6	32be4966-c456-438d-82b2-fd0a0aba5c6c	e9bd897f-906e-42fa-9f9d-75e8a5953155	315000	REJECTED	2026-06-11 09:19:30.341	2026-06-11 09:19:30.341
d02da236-471e-430a-ba67-f88a113d0d99	818449ce-137a-480d-9114-1b54a7858910	ddcb6416-812a-439b-a741-13ee83381c42	552000	PENDING	2026-06-11 09:19:30.342	2026-06-11 09:19:30.342
24e73508-ae91-4ec3-89d3-7010fdfd49bf	190afad7-2ad2-44d7-a223-6d36398d1380	98d06800-5158-4652-9875-f65e2bf456db	4566022	PENDING	2026-06-11 09:34:33.407	2026-06-11 09:34:33.407
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, "passwordHash", "firstName", "lastName", phone, role, "createdAt", "updatedAt") FROM stdin;
2b526385-bc94-4f8b-b2f3-f6a0687449e5	tahiry@ymmo.fr	$2b$12$bT0mI9FyIU1tGnMzUwzfl.jWS65FjziPDvA/sDvcAlkEzZwbcFSQG	Tahiry	Test	\N	CLIENT	2026-05-04 09:47:57.903	2026-05-04 09:47:57.903
be6aa12f-adc7-4318-b2f8-d01a94feb1e3	tahiry2@ymmo.fr	$2b$12$awdkXA4FXrUkFn53MCY8Pe78/cc6u/04Bn1cQEEFZ5F0kET3zWEuW	Tahiry	Test	\N	CLIENT	2026-05-04 09:49:11.7	2026-05-04 09:49:11.7
e6c27d22-150f-49c1-81ad-4a96994a4dc6	nouveau@ymmo.fr	$2b$12$yK3ha.FhfwOk7pPnY00f8uaNHPF/oEzRRCb7bdU4pUqslfXi3K7UK	Tahiry	Test	\N	CLIENT	2026-05-04 09:49:54.293	2026-05-04 09:49:54.293
8aa289c6-65c3-4964-8e94-5062416f7c39	demo@ymmo.fr	$2b$12$OlcJSDQxMprtCVt5xNTC.eJkQtwj0YeYh/vj1fA3VIOXRmnm1SP0G	Tahiry	Demo	\N	CLIENT	2026-05-24 13:42:15.441	2026-05-24 13:42:15.441
c5cb4e19-871a-4694-b95d-4b181d764852	agent@ymmo.fr	$2b$12$NVbbqX0QGFpgSo0Uqd1r5uGI93s2Lj.VXzD3hZrjKd0FlMIWYsfwq	Agent	Ymmo Updated	0612345678	AGENT	2026-05-24 14:00:59.259	2026-05-25 08:59:36.452
357024a8-b49a-4686-ab45-8ae29d2250a8	tu1781163284920@t.com	$2b$12$H343bEKR6HMuadGm03VGWeQ5NMEkul5gemxv8np8BOr9.8zQmCNsK	T	U	\N	CLIENT	2026-06-11 07:34:45.341	2026-06-11 07:34:45.341
736b1d36-66a2-4b06-ab0d-baf161ad6f21	test4@test.com	$2b$12$bCZUhwn6y1KGF/zcRxsb6eMDrm59CvLKlr/LM7L64bRWZXFiO.zEy	Test4	User	\N	CLIENT	2026-06-11 07:35:42.998	2026-06-11 07:35:42.998
aa8f8c66-8315-4fd0-86b1-52ad3c1e6b26	tahiry.ramambazafy@ynov.com	$2b$12$tE7sJbOKXSlweEwcuduLuuc1qNzhBhsLL1ApOrgWWaLoiUq6gj8li	Tahiry	Ramambazafy	0614995533	CLIENT	2026-06-11 07:38:01.573	2026-06-11 07:38:01.573
01929a7e-e55f-4b45-a340-0f2db014c9d9	admin@ymmo.local	$2b$12$PC6qBpzemhXpBRo9P5ApiepXxQkM3e/ZnIaNWwQxxC/LH8mrLIseG	Admin	Ymmo	\N	ADMIN	2026-06-11 09:09:16.639	2026-06-11 09:09:16.639
190afad7-2ad2-44d7-a223-6d36398d1380	tahiry.ramambazafy@outlook.com	$2b$12$f.3DlQ4o5gjyarTHlbVVy.w0Fj6e2OPkT7WIsuNyIsQwWRim03/dO	Tahiry	Ramambazafy	0614995533	CLIENT	2026-06-11 09:11:26.646	2026-06-11 09:11:26.646
0aae1418-e2f8-4407-83b6-d70b8cd78c90	agent.paris.lyon@ymmo.local	$2b$12$w.gJ763fIZH4nbxUg/nu0O2xHnzO4hHGal.iKjOA2ojXBoMZnuYdm	Claire	Martin	\N	AGENT	2026-06-11 09:19:28.825	2026-06-11 09:19:28.825
e224f9af-1cff-4a85-b1af-1544fc70e936	agent.marseille.bordeaux@ymmo.local	$2b$12$rJ5DXqSOJIIV3/pjs63.COpO7gLNChpg2EYW4eo/wfl5WW927SYHy	Nicolas	Bernard	\N	AGENT	2026-06-11 09:19:29.147	2026-06-11 09:19:29.147
7da0436e-340c-4a03-9f6a-96e06d9ce48e	agent.nantes.lille@ymmo.local	$2b$12$OH3.xJ9no8Kf5siWW3aHw.AQ3xgxkSB.APBoUkYqIQ5APER/Bb/VG	Sophie	Dubois	\N	AGENT	2026-06-11 09:19:29.399	2026-06-11 09:19:29.399
784e31e7-a426-4eea-8a7c-ff924c452f88	client.anna@ymmo.local	$2b$12$vneJ10NC8mwG6TcEvqBqteIukZYGAnj6XNP4b6J.dRcEGUTkbGwKC	Anna	Lefèvre	\N	CLIENT	2026-06-11 09:19:29.679	2026-06-11 09:19:29.679
32be4966-c456-438d-82b2-fd0a0aba5c6c	client.marc@ymmo.local	$2b$12$shXUSBCOXjzcteaJgt4gsuU7SFt6y4ouZ6NoiaH/Roh/qu.UJWD36	Marc	Petit	\N	CLIENT	2026-06-11 09:19:29.933	2026-06-11 09:19:29.933
818449ce-137a-480d-9114-1b54a7858910	client.sonia@ymmo.local	$2b$12$VujxSQsuQiSCUQPLbauao.h6Wn0.Ub7QcXQn112MRU.fH3JvbISri	Sonia	Bernier	\N	CLIENT	2026-06-11 09:19:30.186	2026-06-11 09:19:30.186
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
05b2dd89-ffe3-447b-90d8-7540d808bc41	c8c995e69b7d66db01262a30ac208aa14abe8f99c48810c05e0d9ddfc84bd329	2026-05-04 10:10:46.708219+02	20260504081046_init	\N	\N	2026-05-04 10:10:46.670061+02	1
\.


--
-- Name: Agent Agent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agent"
    ADD CONSTRAINT "Agent_pkey" PRIMARY KEY (id);


--
-- Name: Favorite Favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY (id);


--
-- Name: Photo Photo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Photo"
    ADD CONSTRAINT "Photo_pkey" PRIMARY KEY (id);


--
-- Name: Property Property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Agent_licenseNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Agent_licenseNumber_key" ON public."Agent" USING btree ("licenseNumber");


--
-- Name: Agent_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Agent_userId_key" ON public."Agent" USING btree ("userId");


--
-- Name: Favorite_userId_propertyId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Favorite_userId_propertyId_key" ON public."Favorite" USING btree ("userId", "propertyId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Agent Agent_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agent"
    ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Favorite Favorite_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Favorite Favorite_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Photo Photo_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Photo"
    ADD CONSTRAINT "Photo_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Property Property_agentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES public."Agent"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_buyerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict 6qAyYBnOEdQMDTcJSnBOYoyYNW5h2ddmOuum3Xql2uGRNd76HLviM7TFHaYgFQO


--
-- PostgreSQL database dump
--

\restrict HISI6MyXILrNZVM9JmRIdFbjsqUpA0dEkLpjTPmT2xprMEsdPrNKnAg2vtfGvH3

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: group_entity; Type: TABLE; Schema: public; Owner: ejuser
--

CREATE TABLE public.group_entity (
    id integer NOT NULL,
    name character varying NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public.group_entity OWNER TO ejuser;

--
-- Name: group_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: ejuser
--

CREATE SEQUENCE public.group_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_entity_id_seq OWNER TO ejuser;

--
-- Name: group_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ejuser
--

ALTER SEQUENCE public.group_entity_id_seq OWNED BY public.group_entity.id;


--
-- Name: user_entity; Type: TABLE; Schema: public; Owner: ejuser
--

CREATE TABLE public.user_entity (
    id integer NOT NULL,
    name character varying NOT NULL,
    "monthlySalary" numeric(10,2) NOT NULL,
    "deletedAt" timestamp without time zone,
    group_id integer
);


ALTER TABLE public.user_entity OWNER TO ejuser;

--
-- Name: user_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: ejuser
--

CREATE SEQUENCE public.user_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_entity_id_seq OWNER TO ejuser;

--
-- Name: user_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ejuser
--

ALTER SEQUENCE public.user_entity_id_seq OWNED BY public.user_entity.id;


--
-- Name: group_entity id; Type: DEFAULT; Schema: public; Owner: ejuser
--

ALTER TABLE ONLY public.group_entity ALTER COLUMN id SET DEFAULT nextval('public.group_entity_id_seq'::regclass);


--
-- Name: user_entity id; Type: DEFAULT; Schema: public; Owner: ejuser
--

ALTER TABLE ONLY public.user_entity ALTER COLUMN id SET DEFAULT nextval('public.user_entity_id_seq'::regclass);


--
-- Data for Name: group_entity; Type: TABLE DATA; Schema: public; Owner: ejuser
--

COPY public.group_entity (id, name, "deletedAt") FROM stdin;
1	Low Income	\N
2	Middle Income	\N
3	High Income	\N
\.


--
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: ejuser
--

COPY public.user_entity (id, name, "monthlySalary", "deletedAt", group_id) FROM stdin;
1	Zachary Levi	1600000.00	\N	3
2	Aaliyah Khan	24000.00	\N	1
3	Kenji Tanaka	78000.00	\N	2
4	Sophia Martinez	125000.00	\N	2
5	Omar Al-Farouq	960000.00	\N	3
6	Li Wei	18000.00	\N	1
7	Emily Johnson	145000.00	\N	2
8	Hassan Mahmoud	21000.00	\N	1
9	Akira Nakamura	2200000.00	\N	3
10	Daniel Carter	350000.00	\N	2
11	Fatima Zahra	29000.00	\N	1
12	Chen Long	800000.00	\N	3
13	Olivia Brown	110000.00	\N	2
14	Yousef Al-Khalid	33000.00	\N	1
15	Mei Lin	5000000.00	\N	3
16	Michael Thompson	87000.00	\N	2
17	Layla Hassan	17000.00	\N	1
18	Ryo Suzuki	3200000.00	\N	3
19	Ethan Wilson	265000.00	\N	2
20	Noura Al-Sabah	14000.00	\N	1
21	Hiroshi Yamamoto	870000.00	\N	3
22	Isabella Garcia	120000.00	\N	2
23	Ali Rahman	45000.00	\N	1
24	Min-Jae Park	900000.00	\N	3
25	Benjamin Clark	145000.00	\N	2
26	Sara Abdullah	21000.00	\N	1
27	Wei Zhang	760000.00	\N	3
28	Charlotte Davis	300000.00	\N	2
29	Mohammed Ali	28000.00	\N	1
30	Takashi Ito	4800000.00	\N	3
31	James Harris	220000.00	\N	2
32	Amira Nasser	19000.00	\N	1
33	Han Wu	1500000.00	\N	3
34	Lucas Robinson	89000.00	\N	2
35	Karim El-Sayed	26000.00	\N	1
36	Jun Ho Kim	720000.00	\N	3
37	Grace Miller	195000.00	\N	2
38	Yara Al-Hussein	15000.00	\N	1
39	Taro Kobayashi	910000.00	\N	3
40	William Anderson	130000.00	\N	2
41	Rania Saeed	38000.00	\N	1
42	Xiang Liu	2700000.00	\N	3
43	Henry Moore	175000.00	\N	2
44	Samir Awad	23000.00	\N	1
45	Aya Sato	8000000.00	\N	3
46	Victoria Taylor	600000.00	\N	2
47	Ibrahim Omar	33000.00	\N	1
48	Haruto Aoki	1100000.00	\N	3
49	Samuel White	250000.00	\N	2
50	Mona Khaled	27000.00	\N	1
\.


--
-- Name: group_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ejuser
--

SELECT pg_catalog.setval('public.group_entity_id_seq', 3, true);


--
-- Name: user_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ejuser
--

SELECT pg_catalog.setval('public.user_entity_id_seq', 50, true);


--
-- Name: user_entity PK_b54f8ea623b17094db7667d8206; Type: CONSTRAINT; Schema: public; Owner: ejuser
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY (id);


--
-- Name: group_entity PK_d074114199e1996b57b04ac77ba; Type: CONSTRAINT; Schema: public; Owner: ejuser
--

ALTER TABLE ONLY public.group_entity
    ADD CONSTRAINT "PK_d074114199e1996b57b04ac77ba" PRIMARY KEY (id);


--
-- Name: user_entity FK_087a714cf53939e86fd6c49a72a; Type: FK CONSTRAINT; Schema: public; Owner: ejuser
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "FK_087a714cf53939e86fd6c49a72a" FOREIGN KEY (group_id) REFERENCES public.group_entity(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict HISI6MyXILrNZVM9JmRIdFbjsqUpA0dEkLpjTPmT2xprMEsdPrNKnAg2vtfGvH3


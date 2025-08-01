PGDMP      *                }            resume_compare    17.2    17.2     ;           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            <           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            =           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            >           1262    16388    resume_compare    DATABASE     �   CREATE DATABASE resume_compare WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE resume_compare;
                     postgres    false            �            1259    16390    job_description    TABLE     �  CREATE TABLE public.job_description (
    job_id integer NOT NULL,
    job_title character varying(255) NOT NULL,
    job_description text NOT NULL,
    required_skills text NOT NULL,
    experience_required integer,
    company_name text NOT NULL,
    location character varying(255),
    posting_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    job_type character varying(255)[],
    application_deadline date,
    openings integer,
    max_applications integer
);
 #   DROP TABLE public.job_description;
       public         heap r       postgres    false            �            1259    16389    job_description_id_seq    SEQUENCE     �   CREATE SEQUENCE public.job_description_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.job_description_id_seq;
       public               postgres    false    218            ?           0    0    job_description_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.job_description_id_seq OWNED BY public.job_description.job_id;
          public               postgres    false    217            �            1259    24612    selected_resume    TABLE     X  CREATE TABLE public.selected_resume (
    resume_id integer NOT NULL,
    candidate_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    contact_number character varying(20) NOT NULL,
    skills text NOT NULL,
    experience character varying(50),
    matching_score numeric(5,2) NOT NULL,
    job_id integer
);
 #   DROP TABLE public.selected_resume;
       public         heap r       postgres    false            �            1259    24611    selected_resumes_resume_id_seq    SEQUENCE     �   CREATE SEQUENCE public.selected_resumes_resume_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.selected_resumes_resume_id_seq;
       public               postgres    false    222            @           0    0    selected_resumes_resume_id_seq    SEQUENCE OWNED BY     `   ALTER SEQUENCE public.selected_resumes_resume_id_seq OWNED BY public.selected_resume.resume_id;
          public               postgres    false    221            �            1259    16415    users    TABLE     	  CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    status character varying(50) DEFAULT 'active'::character varying
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16414    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    220            A           0    0    users_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.user_id;
          public               postgres    false    219            �           2604    75640    job_description job_id    DEFAULT     |   ALTER TABLE ONLY public.job_description ALTER COLUMN job_id SET DEFAULT nextval('public.job_description_id_seq'::regclass);
 E   ALTER TABLE public.job_description ALTER COLUMN job_id DROP DEFAULT;
       public               postgres    false    218    217    218            �           2604    75641    selected_resume resume_id    DEFAULT     �   ALTER TABLE ONLY public.selected_resume ALTER COLUMN resume_id SET DEFAULT nextval('public.selected_resumes_resume_id_seq'::regclass);
 H   ALTER TABLE public.selected_resume ALTER COLUMN resume_id DROP DEFAULT;
       public               postgres    false    222    221    222            �           2604    75642    users user_id    DEFAULT     i   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public               postgres    false    219    220    220            4          0    16390    job_description 
   TABLE DATA           �   COPY public.job_description (job_id, job_title, job_description, required_skills, experience_required, company_name, location, posting_date, job_type, application_deadline, openings, max_applications) FROM stdin;
    public               postgres    false    218   $       8          0    24612    selected_resume 
   TABLE DATA           �   COPY public.selected_resume (resume_id, candidate_name, email, contact_number, skills, experience, matching_score, job_id) FROM stdin;
    public               postgres    false    222   �%       6          0    16415    users 
   TABLE DATA           K   COPY public.users (user_id, username, email, password, status) FROM stdin;
    public               postgres    false    220   �&       B           0    0    job_description_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.job_description_id_seq', 32, true);
          public               postgres    false    217            C           0    0    selected_resumes_resume_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.selected_resumes_resume_id_seq', 68, true);
          public               postgres    false    221            D           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public               postgres    false    219            �           2606    16398 $   job_description job_description_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.job_description
    ADD CONSTRAINT job_description_pkey PRIMARY KEY (job_id);
 N   ALTER TABLE ONLY public.job_description DROP CONSTRAINT job_description_pkey;
       public                 postgres    false    218            �           2606    24621 *   selected_resume selected_resumes_email_key 
   CONSTRAINT     f   ALTER TABLE ONLY public.selected_resume
    ADD CONSTRAINT selected_resumes_email_key UNIQUE (email);
 T   ALTER TABLE ONLY public.selected_resume DROP CONSTRAINT selected_resumes_email_key;
       public                 postgres    false    222            �           2606    24619 %   selected_resume selected_resumes_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.selected_resume
    ADD CONSTRAINT selected_resumes_pkey PRIMARY KEY (resume_id);
 O   ALTER TABLE ONLY public.selected_resume DROP CONSTRAINT selected_resumes_pkey;
       public                 postgres    false    222            �           2606    16427    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    220            �           2606    16423    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    220            �           2606    16425    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 postgres    false    220            �           2606    24622 ,   selected_resume selected_resumes_job_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.selected_resume
    ADD CONSTRAINT selected_resumes_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.job_description(job_id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.selected_resume DROP CONSTRAINT selected_resumes_job_id_fkey;
       public               postgres    false    4758    222    218            4   W  x���]k�0���8�ֶ�q��w�m���YA��z�̚H���ߗ�e�B8_/�yI\
.������<`A&�\�����FC{�$���	9[UŲ-S3�S���M2�+t?����f���j�9N����8��Q�P�țp�He�C}�u���ou��<r~)���|�����X@�֧�����=��[)�8�2@�U�0���J��:-�߆���4�|/b]�����!�$�Q�e�]��J�a'�	��♂���~�.�f����|PẆ��k�o.ޯ$�Fbr#����Bc�%�Rs)�cc�{y�" �"sr�����:��E=�uhиY��V���+      8   �   x�-���0D��W�^5
�5�0h��*,��@k��]���};Y�[.zdA�*�$s�e-�f�F�h�0/X�1?BwKedNv�-5���
���1��I<1��֦3�h �t^���3e[�s<1Zu��ç-Lҏ��}��tDio�Z�'r���2-C���?37�      6      x������ � �     
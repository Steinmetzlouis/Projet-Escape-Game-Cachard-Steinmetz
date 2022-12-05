PGDMP                         z            objets_escape    15.1    15.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    objets_escape    DATABASE     �   CREATE DATABASE objets_escape WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE objets_escape;
                postgres    false            �           0    0    DATABASE objets_escape    COMMENT     �   COMMENT ON DATABASE objets_escape IS 'Cette base de données contient les différents objets et leurs caractéristiques qui feront partie du projet web "escape game des sports extrêmes" réalisé par Steinmetz Louis et Cachard Benoit.';
                   postgres    false    4242                        3079    16399    postgis 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    DROP EXTENSION postgis;
                   false            �           0    0    EXTENSION postgis    COMMENT     ^   COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';
                        false    2            �            1259    17460    extrem_sports_objects    TABLE     '  CREATE TABLE public.extrem_sports_objects (
    id integer NOT NULL,
    latitude double precision,
    longitude double precision,
    nature character varying(12),
    groupe character varying(10),
    initial boolean,
    zoom integer,
    texte text,
    type_objet character varying(15)
);
 )   DROP TABLE public.extrem_sports_objects;
       public         heap    postgres    false            �           0    0    TABLE extrem_sports_objects    COMMENT     �   COMMENT ON TABLE public.extrem_sports_objects IS 'contient les objets qui seront (ou non en fontion des conditions remplies par l''utilisateur) affichés sur la carte de l''escape game.';
          public          postgres    false    221            �            1259    17459    extrem_sports_objects_id_seq    SEQUENCE     �   CREATE SEQUENCE public.extrem_sports_objects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.extrem_sports_objects_id_seq;
       public          postgres    false    221            �           0    0    extrem_sports_objects_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.extrem_sports_objects_id_seq OWNED BY public.extrem_sports_objects.id;
          public          postgres    false    220            �            1259    17472    hall_of_fame    TABLE     s   CREATE TABLE public.hall_of_fame (
    id integer NOT NULL,
    pseudo character varying(20),
    score integer
);
     DROP TABLE public.hall_of_fame;
       public         heap    postgres    false            �            1259    17471    hall_of_fame_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hall_of_fame_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.hall_of_fame_id_seq;
       public          postgres    false    223            �           0    0    hall_of_fame_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.hall_of_fame_id_seq OWNED BY public.hall_of_fame.id;
          public          postgres    false    222            �            1259    17479    joueur    TABLE     m   CREATE TABLE public.joueur (
    pseudo character varying(20),
    score integer,
    id integer NOT NULL
);
    DROP TABLE public.joueur;
       public         heap    postgres    false            �           2604    17463    extrem_sports_objects id    DEFAULT     �   ALTER TABLE ONLY public.extrem_sports_objects ALTER COLUMN id SET DEFAULT nextval('public.extrem_sports_objects_id_seq'::regclass);
 G   ALTER TABLE public.extrem_sports_objects ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    17475    hall_of_fame id    DEFAULT     r   ALTER TABLE ONLY public.hall_of_fame ALTER COLUMN id SET DEFAULT nextval('public.hall_of_fame_id_seq'::regclass);
 >   ALTER TABLE public.hall_of_fame ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �          0    17460    extrem_sports_objects 
   TABLE DATA           z   COPY public.extrem_sports_objects (id, latitude, longitude, nature, groupe, initial, zoom, texte, type_objet) FROM stdin;
    public          postgres    false    221   h       �          0    17472    hall_of_fame 
   TABLE DATA           9   COPY public.hall_of_fame (id, pseudo, score) FROM stdin;
    public          postgres    false    223   �#       �          0    17479    joueur 
   TABLE DATA           3   COPY public.joueur (pseudo, score, id) FROM stdin;
    public          postgres    false    224   @$       �          0    16712    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public          postgres    false    216   ]$       �           0    0    extrem_sports_objects_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.extrem_sports_objects_id_seq', 21, true);
          public          postgres    false    220            �           0    0    hall_of_fame_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.hall_of_fame_id_seq', 7, true);
          public          postgres    false    222            �           2606    17467 0   extrem_sports_objects extrem_sports_objects_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.extrem_sports_objects
    ADD CONSTRAINT extrem_sports_objects_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.extrem_sports_objects DROP CONSTRAINT extrem_sports_objects_pkey;
       public            postgres    false    221            �           2606    17477    hall_of_fame hall_of_fame_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.hall_of_fame
    ADD CONSTRAINT hall_of_fame_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.hall_of_fame DROP CONSTRAINT hall_of_fame_pkey;
       public            postgres    false    223            �           2606    17483    joueur joueur_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.joueur
    ADD CONSTRAINT joueur_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.joueur DROP CONSTRAINT joueur_pkey;
       public            postgres    false    224            �   q  x��W�r�]���r�����d�gd�����\�J5�Ş�Q�Ee��ʫ�J��x�]��D_�s{ ��TW����s�=���iVqRfY��e^��j-��
��>(�}W��)�2���{V�f�l:��L۳-ښɖu���J���~������hL���v��-{al+�]�%㜽N�Y�$do��ZV����u�6�_�>]��Jk��,=���Z��v<ҿ�6�Jיv��bN���=��.�EO����z|'�"����q�ǁ#��*-3y+���sPQ��l�ⓕ�r��T�`͇�Z��֦[�����\]����� �BN���5�M'撉��?7��Jؚ�����o��u��u/�ٳח�_�q���z 1b��2fQ��Y����<ɶ��I�l��m�5s��x3ֱ)���9�9�p窷�*[��veŭr�� �V�R ��)��K6��L��1��A�w8��7�7�5�m��o`�G)j��,H�0��4.��y��f]ٓ=��V�{c��ył��إ����a"�[��.)�nσ4
�����Cq����x7�����H�v���3�Zs?�j6cG�V���_ɤӦ�K�,�z�����Y\��<	_�z=IԝZ/��m�ʎ���AL>8'�VmE'!��$��^��QTfUL� �Y�,ȃ�uo;kfЌ�dz���E������#����D6g_:$��?h�!��q0"���p�$IR��9����yD�K/���9���{3���QR(Ɏ���8A���c�̭Be@���{n��@x!��!O���M�@KVn�]i�� �@RIT<��z,n1�z`�w�8�-8��D�K�BW������41h=݉<�y���=���+�yL⟛a�	vj�	���1ִ��"��+���X�8J�U�ZR�%Y�V�%�*��2���E�J��s�"l���Ʌ�ki�`@�zP{������/P�L�޳��߁��t�k�ژ�{q~����df �G͛��%�<��(��Y��y��'%���(Zφ��Rr*���sJ�ѧ'�ݠÀs������*
-���{3��~l-���:%�V��OQ�yU��� >���a<��3^D���"2�џ�Q<Z�p^U��4H�0���qΓ*�۳�!]�zjD}=��ZMƾ�����O��6q �*�[�¸�!����߿�w�"�0�5q�1��=H�N��,��/h������^��@�<9�8�\���w��<xq|��^����.�^�3�8�l����@
u~P�Ŧ������u��e '?��{dX$L���$��T�٦ZG��@��X�0g�����)��ѺA#����k<62�h@p���ŧ[�q�')���p2�Ӹsf�=b��C�8N��9�K��1}�A)���"ʡ�DҠ�ÌgQ���Xw�U���o�^[!��xU�WD�7��^U��5��Z�Zl�Ig�5�L�r
}��3&���(fs���%ƃ�ɪeP����
^����fZ�q#�vw�p5F��"Dh�*�53d��rk�V��R�3�#qkة�
��?��f=	rxb�� ���<�7�[ ���q���"{ ]/��[�4�h��$R��")�������X �( 1ȣ���MX��0]Zr�%+;��7�}��kǜ2�<HK0&����Y�ކ��֫e���3#&Ɠ�c	v����蘝_^�	��m�n�C=v��V���ŏЁ��}�*�����aM/UԄ�Ք��0�r:��
�%�դ/7h�Q�{I��9�7�����o�ca3o/ΝE�����(������T��yt����N�}i������m������.!      �   G   x�3�.I-K���O*洄.#N��Ҝ�R5��Ҥ�RN#��1�Rbn"�cj�e�RT�[�ih����� ���      �      x������ � �      �      x������ � �     
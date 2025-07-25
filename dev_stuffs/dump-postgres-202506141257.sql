PGDMP      9                }           postgres    17.4 (Debian 17.4-1.pgdg120+2)    17.0      U           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            V           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            W           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            X           1262    5    postgres    DATABASE     s   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE postgres;
                     postgres    false            Y           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                        postgres    false    3416                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     pg_database_owner    false            Z           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        pg_database_owner    false    4            h           1247    32787    PaymentMethod    TYPE     f   CREATE TYPE public."PaymentMethod" AS ENUM (
    'ESPECES',
    'CB',
    'CHEQUE',
    'VIREMENT'
);
 "   DROP TYPE public."PaymentMethod";
       public               postgres    false    4            V           1247    16794    Role    TYPE     ?   CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);
    DROP TYPE public."Role";
       public               postgres    false    4            �            1259    16816    Cake    TABLE     #  CREATE TABLE public."Cake" (
    id text NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    parts double precision NOT NULL
);
    DROP TABLE public."Cake";
       public         heap r       postgres    false    4            �            1259    16808    Customer    TABLE     0  CREATE TABLE public."Customer" (
    id text NOT NULL,
    lastname text NOT NULL,
    firstname text NOT NULL,
    email text,
    phone text,
    address text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Customer";
       public         heap r       postgres    false    4            �            1259    16824    Order    TABLE     �  CREATE TABLE public."Order" (
    id text NOT NULL,
    "customerId" text NOT NULL,
    total double precision NOT NULL,
    "Withdrawal_date" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    delivered boolean DEFAULT false NOT NULL,
    "PaymentMethod" public."PaymentMethod" NOT NULL,
    deposit double precision,
    remaining_balance double precision
);
    DROP TABLE public."Order";
       public         heap r       postgres    false    4    872            �            1259    16799    User    TABLE     F  CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    name text,
    "Role" public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text NOT NULL
);
    DROP TABLE public."User";
       public         heap r       postgres    false    854    854    4            �            1259    32768    _OrderCakes    TABLE     T   CREATE TABLE public."_OrderCakes" (
    "A" text NOT NULL,
    "B" text NOT NULL
);
 !   DROP TABLE public."_OrderCakes";
       public         heap r       postgres    false    4            �            1259    16784    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap r       postgres    false    4            P          0    16816    Cake 
   TABLE DATA           R   COPY public."Cake" (id, name, price, "createdAt", "updatedAt", parts) FROM stdin;
    public               postgres    false    220   �'       O          0    16808    Customer 
   TABLE DATA           n   COPY public."Customer" (id, lastname, firstname, email, phone, address, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    219   �*       Q          0    16824    Order 
   TABLE DATA           �   COPY public."Order" (id, "customerId", total, "Withdrawal_date", "createdAt", "updatedAt", delivered, "PaymentMethod", deposit, remaining_balance) FROM stdin;
    public               postgres    false    221   �T       N          0    16799    User 
   TABLE DATA           ]   COPY public."User" (id, email, name, "Role", "createdAt", "updatedAt", password) FROM stdin;
    public               postgres    false    218   �T       R          0    32768    _OrderCakes 
   TABLE DATA           1   COPY public."_OrderCakes" ("A", "B") FROM stdin;
    public               postgres    false    222   U       M          0    16784    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public               postgres    false    217   !U       �           2606    16823    Cake Cake_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Cake"
    ADD CONSTRAINT "Cake_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Cake" DROP CONSTRAINT "Cake_pkey";
       public                 postgres    false    220            �           2606    16815    Customer Customer_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Customer" DROP CONSTRAINT "Customer_pkey";
       public                 postgres    false    219            �           2606    16831    Order Order_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pkey";
       public                 postgres    false    221            �           2606    16807    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public                 postgres    false    218            �           2606    32774    _OrderCakes _OrderCakes_AB_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public."_OrderCakes"
    ADD CONSTRAINT "_OrderCakes_AB_pkey" PRIMARY KEY ("A", "B");
 M   ALTER TABLE ONLY public."_OrderCakes" DROP CONSTRAINT "_OrderCakes_AB_pkey";
       public                 postgres    false    222    222            �           2606    16792 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public                 postgres    false    217            �           1259    16839    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public                 postgres    false    218            �           1259    32775    _OrderCakes_B_index    INDEX     N   CREATE INDEX "_OrderCakes_B_index" ON public."_OrderCakes" USING btree ("B");
 )   DROP INDEX public."_OrderCakes_B_index";
       public                 postgres    false    222            �           2606    16841    Order Order_customerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_customerId_fkey";
       public               postgres    false    221    3249    219            �           2606    32776    _OrderCakes _OrderCakes_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_OrderCakes"
    ADD CONSTRAINT "_OrderCakes_A_fkey" FOREIGN KEY ("A") REFERENCES public."Cake"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."_OrderCakes" DROP CONSTRAINT "_OrderCakes_A_fkey";
       public               postgres    false    222    220    3251            �           2606    32781    _OrderCakes _OrderCakes_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_OrderCakes"
    ADD CONSTRAINT "_OrderCakes_B_fkey" FOREIGN KEY ("B") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."_OrderCakes" DROP CONSTRAINT "_OrderCakes_B_fkey";
       public               postgres    false    221    3253    222            P   �  x���An�0E��)t)YR��k]w3��1c�t$�Iz���X� Mb'F,x��8�3cS֠�\�њ���m�s̅Zve�2v3d�b"�%U&��)�US���r�[eZ�j^l����i���1�F�
xÐ��MkU�.t�x�I��7f�]��[FY.f4,�6o��U'"�DF��Q�)�<1������k�C��� ��*�eS��c������ژm�rF~�ށ��C�ُ��쫷c�4��8s��bm7�r�퐤���\v�`���Ȋfm���$q����"�۳/�a���Ċ��S�o=��~oO���(���ЅY�#�EA���$%A����ہ�L��)d;�||�����)(��QO!��!��1�z�~�L$�M,�0�6�ޥ����-\`��[C�6?c���Ә�D
��%(a�!��=3��Xg3����؀�m��u�0�����Tv�L����KE��*�ߏ8+�0`ϖ�� �-3�N{И@*)�@�ׄK�l�/�o I��Y�8obڜC����|I��2)�ASuæY��&_3m�S�۽G��'E�}�J
P��ۧ�*q祈ۿ �V^����ڣb�{�|�wsb�P�����6+�/��A�O��J-,������tj���sL�,E�6���p̮a�%G�6+������k�������L]�Po���#�q9���H��=<���c�p�7λĩ���f����0      O      x�u|k��Ȓ�g�W���D�u����4׆a�a߉� J�R[��G����'K�ݍ z��VUe>��,#�����]�X�U�FVQ6Ҹ(��x�M�lʏq��6i*^N�4���qJś�06���c�q�q���XX�*+y��t��u�<lwe��w?��w�c�.��{)��7&t�d�y��şV+�uU1[	]
�D�יR�F�ֵ&U,&_�e�Tc���*!�F������1���a(>M�vׇ�|��+y>i���7�>���w����pgj-T-��ş�+�H���~<4��~�{�i?�q�K���k��~/�V/��+&虵"e-�i�B��>Q��6�Tze��mb�
��J�:�R�*p��ֶ&��)��io��C*��m(_���8����˫p��Ϯ������^� ���X̺��zٰ	C�����{�Oq�EHm�>m�ā�'8�jD�yq�dxQ>��̮��61��O�R.�ʵ\T^*f��FR�lMG0~-?~퇇Pܦ0ܧ�Xޅ��'��c��S�f\[+/"J2^Y�߫�/8�]�g7oǼ�i��q����b�XF)��Y+͗���3�D��I�J�9�(Y5Z#!IUc�R�l��h�^<S:�/Ǳ��B"��ǆ���!6�/��X��a0�j�u��@Vp��o�C*?���u��;R��f7�~���2�9�[r@a˹�_�yy�?QX����+ɑS�ԕ5B � ޵m�g��A7���M*��k~���]��0��v[��~,��]���Z��K�~+���kPJ�9�?����a>��~�bMS
����H�NA#x�������fy���`��fޯ�V��D��#%����xe���^y��۩.�>��}��f��ٟ�ǰ-_N)]ڴ����]�?���s�>\�K+Y{' ,� X�]ئ÷>}ǢR������c�R���aa�*��hUssLt�\/����8x�V��*�B9p�|���:Ǣ�-3��ݮ�"������~�R�l�ۋ���t��pļr�‥(H����sĶ��^~�m��6��/D�k��9����D��#��Q	�� �,�;��(*|A�x�U>"�4�.�FEֲ�i��,�m.�+`���.e6�+�ّ�%���z�[������.�1�q"��������?���=p2��S��v̝�� �Vܯ��|���lR�\��4ZU25�e���늿�>��(���6�X�L�4�c|��rC<��J��R�RSi�(NBXo�5�����ۅ:>���C0M�p�s��X�h���k{\D��#B�P41�RBJn���UXB�XD�Vux��M�C��=*Mӡ '�9�.M��i������\�@� jGy.��|
�W�`�G�����{;�3�ry�ua�;����c�cWr09��sƭlk;�L[I�u+�*`o��0�r�WR���0୷�bd@~���AvX
�|���,��S��ئ����	�9�_������~����n�c2��x��9x?}
.O'��'��B�D��A�e��4�אָ�LŎ7-��ݴ����BF��͈�? z�C,����z!�ˇG�T!,�HK��>�c������4������&g�"�0j�"�#A��<��h�WH_��';L2��L۪.vB0&�)>�=�| $!�ƶ�4��fŻ���k�'ů��g+�6Ю�����"f�}9�ا�����Է�[�G��'З$M�j�H��g֓����kn��:hY� �P9��׮���� ��o� ,�/B�c!d�rtO�.quq
 U�|į��X�B0�l~5v�8�{J�i�Pz`��xj?�7����߾��Dx �9��V���.I����t�
,�*�p��	"�����)L�:Lm�7�-�0'D'�{	����	1�S�pp�ljd��x?gşS�#e5��w����,f�^s@͹��0Op�m�)YD�%�\�e��	�dSfK�#�r:�ʦVFY�L�)��MH���Q�q��v�u�����v�~	�����΢r=�+)��}|X�o���ڲ�����2�����9��"	%�^���ղ���A0|`ֵ>z�-^Bs#�0~:v�P/ 8�v:lwa���_{����($����6��
l�����q~�Nve �H�͙��lL��Ff�A~���9A�jۢV�%�#_D*�y,�i@T��Z�Ц�x`���d����w2|@ilAY..0|���W�q�ʖ3g�8�D�U�nӦ|?E
��K��N��%�6q�H�S�s�_ׄ��w(Z-�l� �C9��t�r`���z����M?��(�:� ��`~�M�y�w�G����#�?��)���)s�aA����� �x�?9X?���в+�l�&0ğ֤�R�(��i�4��ޯ�� 6��D[��c�P�t�K=�n]�K���]&���5I�8��ϧ�2;�w�]C�B��3tA?������ce�rg�	�\��DW�ڤ�b�v.[W5Vm7����������%�����/y���Bn�qE��:�����i�� �s9�GΦ~��������r�|�'+r�$O�Ѕ��"�,�Vq� a�c�P>�<@�$�=�K���؂�1A�I �'�)��v��]<<Ŕ� �,
����Q| �1}������ߖ��fCu�.���ז�K~����L�dy�T�=̞Jv��PQƥ�)3���o��%*��x�O�6�*��r�/���k� 9��.��\(��i�����R7 �2�Rix�8�#��·c	���o�Z�� 8�@�*���t�k}��lY���n�!���CO����[&��P� ���gP�+Mm��@�?�P�����y�m����8=�r1�PZK]%V�<0V^R��	�AT."��1ȼ��{(���5i(�������a3N����U�qd �RbƧ�[��~^�M���y��O�B��@���;�#2G�����f�|M-S����BD ��K@�g{��,QO��7@�͸�p:g��z<7P��懇�
�������ơ/o������
H��g��c�4�(�u-lo[�'UJ���0U#q�a�u���� �#v��~�y�\�����铹tpq#�f;<9g^E+�h��M���4�*p~���� ��
|8p�
�ۯX�Px���R�A���k�c4��3M�� ��_�a�"~�������u�r�#�����[�b�Bf���^����m�!!�1����xg�6��'�׆�K�B�}S�J�R����P�����!����tM+Z�a#��C.�|F�>n�6����F�VLx���2��a�%�p��a�L�ߥ��b|���B���œ2Z볼��J��ښqq��dT�UN�lhypЭ���
���hD� �t+���(���J}7M��DX�f
�����#O/rBB'	���
����3�~h�Ӂ��a�Ƞ�
Z������LbTu^��Q�#�j&�*t܅N��m��T��Y��u8�����|�H��U��Ӹ���%շ��+rs G>�7H�2�g��l��5�oG����Ǐ"����_Y�aM:�Yw�6HpXk*}�<^1�#Z�� �"hb� �o�c
p:�"(?~�]��/����A�!E� �zLp�[�K�L��{x/��r��a�s���mנ��n�bðs�s"aQ�kN�M
IB�RR�d��X �X��*[�<a,�E'��ζųu 4} �ͥ?2xw��g*��̥���Qܥ�`��56�)��	�͝Wr3���~Ô�~�
41|�$�=�����1Q�בY�q`U�"k���B)HY54�"b,��������.ޥ�'�>'
)��Ƈ��.�eB��:�yҐ�B,���?EΧu.�>��I��z��/*I6��\`J��*�\,�.wN��VKZ�m�5�RM��v��hDg���ͷPƛ�E�|K �[h&���_���p�Obq�fJU�f�}�D#�    �������N���r���k͈2�=�8��T1G�)��KI{*�"	U�L�u��18;W��6�|B����ZJ&�8�����'�7Ae�-咓\�	�}��~�ߐC��=�@����\S���&�{%���'�����'˓�THf�Z��1t�nb�t��L�i��S��c�#�^�CR��(���V�'+�SЃq�4�������Q��c�,��b$��I�Z�ϱc�?��T�4_qř`��]%k��50��(�.@�PWhܔ7cZ?Bp�MN
	�i�)կ�>>�k���UL��g�F@%��P�m�2 ��+V��qC @Q���ڙ���@��jW,:�dx
A���>3Ъi��`�]��\���NcK��՘���6ifj{�m×��ƫ5NG 41J�X�6/hJu���#�>����h)�?�7��Zf�m��p:����x~	w@�'Y�c�.��[H�����F�&AQ�<��K�{+/���(_�b>���X	�6N���i�"W: ^�X����f
��3BD5�ա)g3e�yJ��vy�}>�9˞S�eɲWc.�|\�aC~�)qR]�&Oo�9m��ҕ�Y�7�~LFYI��^��;�Q��. 4���!}����{yק���=�F�c����*�M�]��/<4!��UXs�Q�- T}�oN���z�!�<#8��I�)0�2�H�xIEU�����`}���	�[�iI���m3{��3����~U�b3�R��]��[<��=/8���i2	G�<��E�6-5��c���I�\ۭ�,Ўօ�����蕷Ъ(�x�2�����mRǩQ}�����W{��~�5��G?7h��`h'�<ZJ������+��i
��Si�Y�~E�~�ssFvnN�+���ꔓ�D?��'��Z��p�bx`�"1۔`8�S�sx��b=��x��~;�_G�G�������v��Q	]���{5wH����E��Q~�c��Ο2�����]û��ݑ�gy:��U�ib�@��4H��t�ض�:��K�B�nv����F�����u�_�"�2�Rf�Jc@o��3@�| t��
Ne��M�yBG*{��z��R�/.J�J�B����+#]R���&�*e`��x}iH��Vu�+<S�v��k��{ �ڶ�b�R����9�;�q�?J=���܋�It���1�S@���c�9IE�Ӧj�"��۝C
�E�>:��j��>�sZ^��Y�G'xQă������l�����-��[j���h��͋ylŲ_A
��ç ���}!������uC�~"|����0)��C�0�8�Nq�hiPAr��S��;6MG�d� ���5L��T�ed���I�ҌN�0s�q� ��h+�߆�~���G{Y�5��3T#�s���!���"�+ h6�����k�L�����j|�3�rm�@���ӊ�d	�5O �!æ/ߍi {�~[/����&](�, ��@vq�/���E���ֽ��1w1�^;� �v�R
;W����Ӥh,A@Nw)�p �����(�[ɻ������y��"A�ð[�cI��0�S?~��a//�Y����#�o�^"j�\�V����-yF'ϩ�r�S
R����їkXA�1��v�$5!A�SL��.��}A��0��L[N�O�����v7�q�`w�7�L�K�l%��������Ls����8=Ҵ�t��ܩl;�{)Қ��b0O,|#�)"�~5�^`*6��u�T��f��7 zj�:�d��H�d�_.�;�ML��o%�&_��|O@�sw�Mj����R4˹9N�����[{^��5*Ikq�[�<�VV���@�"[vO�%�Lla'�S��/Ô;�wc��^&=|�m���Z
�4$�eS������sB��Ta�p�'�D�EQ˕�DٙOX��*W��I�ؙ�7
�ʨ���ȆP����{�X��; ћ0!��I������w�P��N�k����Z��HE�}�����mj*�ZiVQ8����:ׂ`�إ��(���`� XEV³;BYE-x�
RV�E��o��HI�X&��g� ��\=��V�?���/���KÆYC�m,���R+�]_l�\dZĭ��_�Oe�N���=ի��!�d�}C�FQ�F�yC�y
T��[�4k�a����O�9�&6�u�t��<byN��
�/�6V���w.���{ç���`�8��Έ
gD��RT85x��ίD�V��T�:
v�
B@M[��ڸ�R��@SF$���y"o�xB�x}9�,�+;Ϭ���$��Z�;���	;�<ބ<��&�����q�2��hQ���TD1�fy����<��������]�0M��7��V�Xz�5l�S;��Ȁ���ߨ�̯E!,:��r������w}is� ����R�΃���ʎ�!����Q�R�4/�J2�� ��XXz�:[y�%U4T�yx*���h������� <&�z�D�"p��P���z�M�����X�źj����*s;���E��]��` �B
D�}2���89MAjJ�cɢ�J�'��R�l��@�:�Tz+>����G��?���뽳��7Pgmw'2��p,bs�ąK�iL]����MkC+��Xq�w��"!%�`=Ru-�VR7E�}�<Wގ���ٮ��<n^�j��AX��J�D�z.��k�r�OC�z�P�@Rs���&�mG�^�/�&g��%/���B	�Jv4�o�*��8щ5�bM��aӔ��@��E�΃�_�zDȠ�u�VF�n� �����v�;���݌C�an�����̥��siOф�iX����v��ǹtuD�IU�2�4�<�@�@s�GH�Cy�׻b���w��5$��E��$�s�Y�*�奼��%���{�m��<vњ�eG@-8O9o)G���5r`�$�*x穷iu�FT��.�ĥO�z�V~�3x�	�<vNe߬u�/u��������775?�)��5lɭj�؉�Dv��k�΅�yV�X���U���O�	���WS����N�ɤ�M鞆)���0~����5���_�0�9�=\NK{5��4R�r@婄�{ ѳ��4���b��9`E3�`^�u	7�ř ������C:Y�E��	�6\F��H�@��DA�aNs�S�o�~��!/��:������9����/x�<I����؅ZR����]̓)ŋ�N�;�Bv��R��U�쐨��he�,K� �s���׳7z5~��h<ohwu���;i�aQa{������d	<d�������F�奁V�Zu1Z+��F#x�i'W�q�$(>�x�:Aq8&Y%c+���˦+^L)�V�/��_��CVKTI�V�����Պ �Yʹ�G��t��ԧޕ/6aG3�('�ϕ�<&Xs}��:W�s%���6�B�U-C�+��E89e��R�r�� 2p��$��]���q�r7����n���0&�j��q8� �)pt�t���tC| w9��3kt]�R��N�5	N3#"�~1��SQ9W��\u���H�j�����4��?F���B�0��ls]�S��4l��?H����q�V8Y�t�+�B^�V�s�l.(�3�LotG�澱�9�	Y�HS]� �$�CZ$7������?��h,܄ "
�bf��x�M���5�{PӜ�����H�����P������2��sѰ�S�"�Ǎ0+ل$�Tor��Ԉ��w�q�x�;���/���٢���t��n�WW������S���2[�S}����У�tl�9/�EKR�@���x~Ns	4��#j�"�5H�D�!x,5\��z��}�	~s�Rɒ
zūy�����s�T�C@��B |���\�cAХH,%/2�Sh��{�LV�T#ɷ���b�?W꩖'kv�T�yv*1��֫�AY���Ш#ģ���Έ����( Ѡ�"�N$��4���h����I��st��k2�6�A(L��c��R��3a�<�Ʃ~g�E��dA �	  
�df�*�8���"�8W�ъ�[����������$� ���a��HH���~^=��)/�tdt�E{w�?���_�\.h �	�s��Iw� $6��V�M���ql�e���C4%��mAa�tH�Ǜ��Ս�D2���\�	��.��7����t�ǰ��*���H 2��n�0���nb�zK�O�.��P�`���3�f?Ce 	d���F��6�!�W*
:��u�uoG��-�����N�/'�זP4�^*!Ʃ���4D������71���NҐ@(��gzw�|`3��G�hv��� "�W�,X�1 ��&jX'�N�O6�����9݇y6m�w! "���W��1?\�p��/�Fp���_^_L��J@�ed�f��Z:�/��������gʞ���L�\�(C��j� Ug-��WUc���_܌Ms��Ă��P<�:M���D���sM�Li����s���e|@ ��Ꮦ�;v���k�aCU�SF�<ϣ�4ׯ�*1d'�*R\񀠲Pd:� 餥�"��_��O�L����Ǳ~9(��e��ј)5���=��ͼ�t8��z��&��s0)~n⒯��U-��u�Fy����!! �]k4�Gu�L�p�'g�j�W)�1"~s�����+���͗\d��]T��ë��He�����~��yJ���bPs�24;�Om,����\���5��Ȯ��
z�r-,Q�BBb(�$h.�2�u�-)1�&C> ��T�ۇ>}��/�����IZ����/���<H�a�n=W���:�Q��.�����J>2�j�5�M
ښ�(��ȼ���`��=�[udjҮoCr!)�!8v����ۊ��|�~ṼQ�}�EN��<���t�ۙ�f��@�V"Mz�u$ҐD}"�*��_9�H�7	��b
�l���vK�U�1+�!엙Ӟ�bGJ�r~��}]��ӝT`;�~��(fY^	����E�T�D3�ј:]J5���n�eh���E���e&�l�[�$�B���r^�`M�R����M��-�'f�@�JF����ö���}9]�$<Ơ�ac9�W�t�s6$���#�i�4_;�'h������FΨ����VF*Bj�Ј ]�`�u�Uֱ���.�o���8�l��M�mGH@ZوPg9��k3E�,����u�!�Ǳ����F�]3�=5�{>����T�'*rý���V��D�efV ڐb�@�������i��<����C���o]lү���±�)
G����ů����6�������RB�䖕�d8J�͜�0��	���Zz���XAU`�� _;v��s&��Sx���w�a�i9�MP��A�h8��8C��/��p�ڥ"��`Y�9�X.�+_{��"2���$еS6�� �h�!�`��z�Ռ{P5f��a����Oi&�B+���m�m\�R�`�^���,�^���a�� ڤ�c�g��<W�Y>>g�9O7Q68j�I��t+5,K4gGӿ�v��=è�W:Q%��f��?c�0�B�6�^�e��K�t�LcMX`��%���<9.
����=�3W���=B�˨"�M�\M�����+8���P���1 %)���h%p���8�e�p�H:]���v�^f�v����]UŞ'4>Q��v��p�*ɬ:���y4��.�Ov�Kϙ0��+�D*�:u�W��a L]jD������.g�����I�0}1�t�D��8�O�I�ì3����~�k�L��Ĝ��6�.h#�����y+X4��Z��▆�(q�i�K�2Y v{�p~�ˏ��d��SKdq}�bR���	h暑z��g���\P�'�L|�?��"�Gy\PGg�o���ϳ�6_)�8�	�/�%y�6��F�ۊ��CV���tM>�l�?>҇ݤ����X�w�,(n	�l�Z��c��N2.����e;����^�?�B�n�T�O���sP��P{�O61�a�#5�tW"�W6�	��Q�ȧh�j�Nc�P����/����H�tUJ2G
o�!�8h�Z�](Y�� �4/�E�#�.�Lr��^"O\)A�͂�`�L���>�"P@4�$̣�B��:�ԳX�w4 �	�i�&q�9�f���|ɗ�.3A����M3��R�Js���Q-4ȯ=)�����,;%U*uMjc�O!��;�dM�Z��u-�0\���r��7T\�2�:.g����z�M6r���e�d��7�%n$6��1(_ody6ɸ��tP��ؘ�GL�U�n�^t4�F׼�8��Ih�Z�hO��|�"}O%�����4R��|�c��~"'��Cn(���e1�hF�؁m��(����������gG�	>�ц�c^�.Dbޙ��S�g]%�'k.��(���"aR7�l+y˃AxW|M�h�(v�4��q�^��l�t���2�M��j����WQ���C�����i� �&Aݸ��m[�)���+�7���6�>_H����u߼������W���L�2�      Q      x������ � �      N      x������ � �      R      x������ � �      M   �   x�m�Aj1E�3�Ⱦ8H�,[s�� 0Ȗ��@)='���!��=s�4�@���)��8|0���t���F�Q�b6��8htl1����d���@u'��X�SԹPI�ʉp+m�rƂ�����0�~}�~,������"Y=\QIGgLQ��7����ju���q	0:v��6rP�00����(��k+�P�����z.v�s��K�'�����T�^��r��}��]?�=|�������
7f�q���u���bO     
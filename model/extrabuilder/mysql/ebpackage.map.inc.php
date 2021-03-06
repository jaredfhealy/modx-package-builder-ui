<?php
$xpdo_meta_map['ebPackage']= array (
  'package' => 'extrabuilder',
  'version' => '1.1',
  'table' => 'extrabuilder_packages',
  'extends' => 'xPDOSimpleObject',
  'tableMeta' => 
  array (
    'engine' => 'InnoDB',
  ),
  'fields' => 
  array (
    'display' => '',
    'package_key' => '',
    'base_class' => 'xPDOObject',
    'platform' => 'mysql',
    'default_engine' => 'InnoDB',
    'phpdoc_package' => '',
    'phpdoc_subpackage' => 'model',
    'version' => '1.1',
    'sortorder' => 0,
    'core_path' => '{core_path}components/{package_key}/',
    'assets_path' => '{assets_path}components/{package_key}/',
    'vuecmp' => '',
    'lexicon' => '',
  ),
  'fieldMeta' => 
  array (
    'display' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'package_key' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'base_class' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => 'xPDOObject',
    ),
    'platform' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => true,
      'default' => 'mysql',
    ),
    'default_engine' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => 'InnoDB',
    ),
    'phpdoc_package' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'phpdoc_subpackage' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => 'model',
    ),
    'version' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => '1.1',
    ),
    'sortorder' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
    'core_path' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '191',
      'phptype' => 'string',
      'null' => true,
      'default' => '{core_path}components/{package_key}/',
    ),
    'assets_path' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '191',
      'phptype' => 'string',
      'null' => true,
      'default' => '{assets_path}components/{package_key}/',
    ),
    'vuecmp' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '20',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'lexicon' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '20',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
  ),
  'composites' => 
  array (
    'Objects' => 
    array (
      'class' => 'ebObject',
      'local' => 'id',
      'foreign' => 'package',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
    'Transports' => 
    array (
      'class' => 'ebTransport',
      'local' => 'id',
      'foreign' => 'package',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);

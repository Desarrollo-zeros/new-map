<?php

/**
 * @package Mentorts
 * Plugin Name: Mapas - Mentor360
 * Plugin URI: localhost
 * Description: Plugin de Mentor360 para gestion de carga de excel.
 * Version: 1.0 18 jan 2021
 * Author: mentor360.co
 * Author URI: mentor360.co
 */

//  security
defined('ABSPATH') or die('You can\'t acces to this file');
// main class 
class Mentormaps
{
	function __construct()
	{
		$this->enqueue();
		$this->register();
		
	}
	function register()
	{
		add_action('admin_enqueue_scripts', array($this, 'enqueue'));
		add_action('admin_menu', array($this, 'my_admin_menu'));
	}
	
	function activate()
	{
		// genereted CPT
		// flush 
		flush_rewrite_rules();
	}
	
	function deactivate()
	{
		// flush
		flush_rewrite_rules();
	}
	function uninstall()
	{
	}
	function enqueue()
	{
		// enqueue our scrips 
		wp_enqueue_style('mypluginstyle', plugins_url('/assets/mystyle.css', __FILE__));
		// Agregamos lo de contact form 7
	}
	function my_admin_menu()
	{
		add_menu_page('Excel Mapas', 'Excel Mapas', 'manage_options', 'listado', '', "", 2);

		add_submenu_page('listado', 'Cargar Excel', 'Cargar Excel', 'manage_options', 'listado', array($this, 'transaction_page'));
		
	}
	function create_page()
	{
		include 'views/create.php';
		wp_enqueue_script("mypliginscript", plugins_url("/assets/script.js", __FILE__));
	}
	function transaction_page()
	{
		?>
			<?php include 'views/transaction.php' ?>
		<?php
	}
	
}
if (class_exists('Mentormaps')) {
	$mentormaps = new Mentormaps();
}


// register actions
// Activate 
register_activation_hook(__FILE__, array($mentormaps, 'activate'));
// Deactivate
register_deactivation_hook(__FILE__, array($mentormaps, 'deactivate'));
// Uninstall

